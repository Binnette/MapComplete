import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from "fs";
import ScriptUtils from "../../scripts/ScriptUtils";
import {Utils} from "../../Utils";
import {exec} from "child_process"
import {GeoOperations} from "../../Logic/GeoOperations";

ScriptUtils.fixUtils()

class StatsDownloader {

    private readonly startYear = 2020
    private readonly startMonth = 5;
    private readonly urlTemplate = "https://osmcha.org/api/v1/changesets/?date__gte={start_date}&date__lte={end_date}&page={page}&comment=%23mapcomplete&page_size=100"

    private readonly _targetDirectory: string;


    constructor(targetDirectory = ".") {
        this._targetDirectory = targetDirectory;
    }

    public async DownloadStats() {

        const today = new Date();
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth() + 1
        for (let year = this.startYear; year <= currentYear; year++) {
            for (let month = 1; month <= 12; month++) {

                if (year === this.startYear && month < this.startMonth) {
                    continue;
                }

                if (year === currentYear && month > currentMonth) {
                    break
                }

                const pathM = `${this._targetDirectory}/stats.${year}-${month}.json`
                if (existsSync(pathM)) {
                    continue;
                }

                for (let day = 1; day <= 31; day++) {
                    if (year === currentYear && month === currentMonth && day === today.getDate() ) {
                        break;
                    }
                    const path = `${this._targetDirectory}/stats.${year}-${month}-${(day < 10 ? "0" : "") + day}.json`
                    if(existsSync(path)){
                        console.log("Skipping ", path,": already exists")
                        continue
                    }
                    try{
                        
                    await this.DownloadStatsForDay(year, month, day, path)
                    }catch(e){
                        console.error(e)
                        console.error("Could not download "+year+"-"+month+"-"+day+"... Trying again")
                        try{
                            await this.DownloadStatsForDay(year, month, day, path)
                        }catch(e){
                            console.error("Could not download "+year+"-"+month+"-"+day+", skipping for now")
                        }
                    }
                }
            }
        }

    }

    public async DownloadStatsForDay(year: number, month: number, day: number, path: string) {

        let page = 1;
        let allFeatures = []
        let endDay = new Date(year,month - 1 /* Zero-indexed: 0 = january*/,day + 1);
        let endDate = `${endDay.getFullYear()}-${Utils.TwoDigits(endDay.getMonth()+1)}-${Utils.TwoDigits(endDay.getDate())}`
        let url = this.urlTemplate.replace("{start_date}", year + "-" + Utils.TwoDigits(month) + "-" + Utils.TwoDigits(day))
            .replace("{end_date}", endDate)
            .replace("{page}", "" + page)


        let headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://osmcha.org/?filters=%7B%22date__gte%22%3A%5B%7B%22label%22%3A%222020-07-05%22%2C%22value%22%3A%222020-07-05%22%7D%5D%2C%22editor%22%3A%5B%7B%22label%22%3A%22mapcomplete%22%2C%22value%22%3A%22mapcomplete%22%7D%5D%7D',
            'Content-Type': 'application/json',
            'Authorization': 'Token 6e422e2afedb79ef66573982012000281f03dc91',
            'DNT': '1',
            'Connection': 'keep-alive',
            'TE': 'Trailers',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        }


        while (url) {
            ScriptUtils.erasableLog(`Downloading stats for ${year}-${month}-${day}, page ${page} ${url}`)
            const result = await Utils.downloadJson(url, headers)
            page++;
            allFeatures.push(...result.features)
            if (result.features === undefined) {
                console.log("ERROR", result)
                return
            }
            url = result.next
        }
        console.log(`Writing ${allFeatures.length} features to `, path, Utils.Times(_ => " ", 80))
        allFeatures = Utils.NoNull(allFeatures)
        allFeatures.forEach(f => {
            f.properties.id = f.id
        })
        writeFileSync(path, JSON.stringify({
            features: allFeatures
        }, undefined, 2))
    }

}


interface ChangeSetData {
    "id": number,
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [number, number][][]
    },
    "properties": {
        "check_user": null,
        "reasons": [],
        "tags": [],
        "features": [],
        "user": string,
        "uid": string,
        "editor": string,
        "comment": string,
        "comments_count": number,
        "source": string,
        "imagery_used": string,
        "date": string,
        "reviewed_features": [],
        "create": number,
        "modify": number,
        "delete": number,
        "area": number,
        "is_suspect": boolean,
        "harmful": any,
        "checked": boolean,
        "check_date": any,
        "metadata": {
            "host": string,
            "theme": string,
            "imagery": string,
            "language": string
        }
    }
}

const theme_remappings = {
    "metamap": "maps",
    "groen": "buurtnatuur",
    "updaten van metadata met mapcomplete": "buurtnatuur",
    "Toevoegen of dit natuurreservaat toegangkelijk is": "buurtnatuur",
    "wiki:mapcomplete/fritures": "fritures",
    "wiki:MapComplete/Fritures": "fritures",
    "lits": "lit",
    "pomp": "cyclofix",
    "wiki:user:joost_schouppe/campersite": "campersite",
    "wiki-user-joost_schouppe-geveltuintjes": "geveltuintjes",
    "wiki-user-joost_schouppe-campersite": "campersite",
    "wiki-User-joost_schouppe-campersite": "campersite",
    "wiki-User-joost_schouppe-geveltuintjes": "geveltuintjes",
    "wiki:User:joost_schouppe/campersite": "campersite",
    "arbres": "arbres_llefia",
    "aed_brugge": "aed",
    "https://llefia.org/arbres/mapcomplete.json": "arbres_llefia",
    "https://llefia.org/arbres/mapcomplete1.json": "arbres_llefia",
    "toevoegen of dit natuurreservaat toegangkelijk is": "buurtnatuur",
    "testing mapcomplete 0.0.0": "buurtnatuur",
    "https://raw.githubusercontent.com/osmbe/play/master/mapcomplete/geveltuinen/geveltuinen.json": "geveltuintjes"
}

class ChangesetDataTools {

    public static cleanChangesetData(cs: ChangeSetData): ChangeSetData {
        if (cs.properties.metadata.theme === undefined) {
            cs.properties.metadata.theme = cs.properties.comment.substr(cs.properties.comment.lastIndexOf("#") + 1)
        }
        cs.properties.metadata.theme = cs.properties.metadata.theme.toLowerCase()
        const remapped = theme_remappings[cs.properties.metadata.theme]
        cs.properties.metadata.theme = remapped ?? cs.properties.metadata.theme
        if (cs.properties.metadata.theme.startsWith("https://raw.githubusercontent.com/")) {
            cs.properties.metadata.theme = "gh://" + cs.properties.metadata.theme.substr("https://raw.githubusercontent.com/".length)
        }
        if (cs.properties.modify + cs.properties.delete + cs.properties.create == 0) {
            cs.properties.metadata.theme = "EMPTY CS"
        }
        try {
            cs.properties.metadata.host = new URL(cs.properties.metadata.host).host
        } catch (e) {

        }
        if (cs.properties.metadata["answer"] > 100) {
            console.log("Lots of answers for https://osm.org/changeset/" + cs.id)
        }
        return cs
    }

}

interface PlotSpec {
    name: string,
    interpetKeysAs: "date" | "number" | "string" | string
    plot: {
        type: "pie" | "bar" | "line"
        count: { key: string, value: number }[]
    } | {
        type: "stacked-bar"
        count: {
            label: string,
            values: { key: string | Date, value: number }[],
            color?: string
        }[]
    },

    render(): Promise<void>
}

function createGraph(
    title: string,
    ...options: PlotSpec[]): Promise<void> {
    console.log("Creating graph", title, "...")
    const process = exec("python3 Docs/Tools/GenPlot.py \"graphs/" + title + "\"", ((error, stdout, stderr) => {
        console.log("Python: ", stdout)
        if (error !== null) {
            console.error(error)
        }
        if (stderr !== "") {
            console.error(stderr)
        }
    }))

    for (const option of options) {
        const d = JSON.stringify(option) + "\n"
        process.stdin._write(d, "utf-8", undefined)
    }
    process.stdin._write("\n", "utf-8", undefined)


    return new Promise((resolve) => {
        process.on("exit", () => resolve())
    })

}

class Histogram<K> {
    public counts: Map<K, number> = new Map<K, number>()
    private sortAtEnd: K[] = []

    constructor(keys?: K[]) {
        const self = this
        keys?.forEach(key => self.bump(key))
    }

    total(): number {
        let total = 0
        Array.from(this.counts.values()).forEach(i => total = total + i)
        return total
    }

    public bump(key: K, increase = 1) {

        if (this.counts.has(key)) {
            this.counts.set(key, increase + this.counts.get(key))
        } else {
            this.counts.set(key, increase)
        }
    }

    /**
     * Adds all the values of the given histogram to this histogram
     * @param hist
     */
    public bumpHist(hist: Histogram<K>) {
        const self = this
        hist.counts.forEach((value, key) => {
            self.bump(key, value)
        })
    }

    /**
     * Creates a new histogram. All entries with less then 'cutoff' count are lumped together into the 'other' category
     */
    public createOthersCategory(otherName: K, cutoff: number | ((key: K, value: number) => boolean) = 15): Histogram<K> {
        const hist = new Histogram<K>()
        hist.sortAtEnd.push(otherName)

        if (typeof cutoff === "number") {
            this.counts.forEach((value, key) => {
                if (value <= cutoff) {
                    hist.bump(otherName, value)
                } else {
                    hist.bump(key, value)
                }
            })
        } else {
            this.counts.forEach((value, key) => {
                if (cutoff(key, value)) {
                    hist.bump(otherName, value)
                } else {
                    hist.bump(key, value)
                }
            })
        }

        return hist;
    }

    public addCountToName(): Histogram<string> {
        const self = this;
        const hist = new Histogram<string>()
        hist.sortAtEnd = this.sortAtEnd.map(name => `${name} (${self.counts.get(name)})`)

        this.counts.forEach((value, key) => {
            hist.bump(`${key} (${value})`, value)
        })

        return hist;
    }

    public Clone(): Histogram<K> {
        const hist = new Histogram<K>()
        hist.bumpHist(this)
        hist.sortAtEnd = [...this.sortAtEnd];
        return hist;
    }

    public keyToDate(addMissingDays: boolean = false): Histogram<Date> {
        const hist = new Histogram<Date>()
        hist.sortAtEnd = this.sortAtEnd.map(name => new Date("" + name))

        let earliest = undefined;
        let latest = undefined;
        this.counts.forEach((value, key) => {
            const d = new Date("" + key);
            if (earliest === undefined) {
                earliest = d
            } else if (d < earliest) {
                earliest = d
            }
            if (latest === undefined) {
                latest = d
            } else if (d > latest) {
                latest = d
            }
            hist.bump(d, value)
        })

        if (addMissingDays) {
            while (earliest < latest) {
                earliest.setDate(earliest.getDate() + 1)
                hist.bump(earliest, 0)
            }
        }
        return hist
    }

    public asRunningAverages(convertToRange: ((key: K) => K[])) {
        const newCount = new Histogram<K>()
        const self = this
        this.counts.forEach((_, key) => {
            const keysToCheck = convertToRange(key)
            let sum = 0
            for (const k of keysToCheck) {
                sum += self.counts.get(k) ?? 0
            }
            newCount.bump(key, sum / keysToCheck.length)
        })
        return newCount
    }

    /**
     * Given a histogram:
     * 'a': 3
     * 'b': 5
     * 'c': 3
     * 'd': 1
     *
     * This will create a new histogram, which counts how much every count occurs, thus:
     * 5: 1  // as only 'b' had 5 counts
     * 3: 2  // as both 'a' and 'c' had 3 counts
     * 1: 1 // as only 'd' has 1 count
     */
    public binPerCount(): Histogram<number> {
        const hist = new Histogram<number>()
        this.counts.forEach((value) => {
            hist.bump(value)
        })
        return hist;
    }

    public stringifyName(): Histogram<string> {
        const hist = new Histogram<string>()
        this.counts.forEach((value, key) => {
            hist.bump("" + key, value)
        })
        return hist;
    }

    public asPie(options: {
        name: string
        compare?: (a: K, b: K) => number
    }): PlotSpec {
        const self = this
        const entriesArray = Array.from(this.counts.entries())
        let type: string = (typeof entriesArray[0][0])
        if (entriesArray[0][0] instanceof Date) {
            type = "date"
        }
        const entries = entriesArray.map(kv => {
            return ({key: kv[0], value: kv[1]});
        })

        if (options.compare) {
            entries.sort((a, b) => options.compare(a.key, b.key))
        } else {
            entries.sort((a, b) => b.value - a.value)
        }
        entries.sort((a, b) => self.sortAtEnd.indexOf(a.key) - self.sortAtEnd.indexOf(b.key))


        const graph: PlotSpec = {
            name: options.name,
            interpetKeysAs: type,
            plot: {

                type: "pie",
                count: entries.map(kv => {
                    if (kv.key instanceof Date) {
                        return ({key: kv.key.toISOString(), value: kv.value})
                    }
                    return ({key: kv.key + "", value: kv.value});
                })
            },
            render: undefined
        }
        graph.render = async () => await createGraph(graph.name, graph)
        return graph;
    }

    public asBar(options: {
        name: string
        compare?: (a: K, b: K) => number,
        color?: string
    }): PlotSpec {
        const spec = this.asPie(options)
        spec.plot.type = "bar"
        spec.plot["color"] = options.color
        return spec;
    }

    public asLine(options: {
        name: string
        compare?: (a: K, b: K) => number
    }) {
        const spec = this.asPie(options)
        spec.plot.type = "line"
        return spec
    }

}

/**
 * A group keeps track of a matrix of changes, e.g.
 * 'All contributors per day'. This will be stored internally, e.g. as {'2022-03-16' --> ['Pieter Vander Vennet', 'Pieter Vander Vennet', 'Joost Schouppe', 'Pieter Vander Vennet', 'dentonny', ...]}
 */
class Group<K, V> {

    public groups: Map<K, V[]> = new Map<K, V[]>()

    constructor(features?: any[], fkey?: (feature: any) => K, fvalue?: (feature: any) => V) {
        const self = this;
        features?.forEach(f => {
            self.bump(fkey(f), fvalue(f))
        })
    }

    public static createStackedBarChartPerDay(name: string, features: any, extractV: (feature: any) => string, minNeededTotal = 1): void {
        const perDay = new Group<string, string>(
            features,
            f => f.properties.date.substr(0, 10),
            extractV
        )

        createGraph(
            name,
            ...Array.from(
                stackHists<string, string>(
                    perDay.asGroupedHists()
                        .filter(tpl => tpl[1].total() > minNeededTotal)
                        .map(tpl => [`${tpl[0]} (${tpl[1].total()})`, tpl[1]])
                )
            )
                .map(
                    tpl => {
                        const [name, hist] = tpl
                        return hist
                            .keyToDate(true)
                            .asBar({
                                name: name
                            });
                    }
                )
        )
    }

    public bump(key: K, value: V) {
        if (!this.groups.has(key)) {
            this.groups.set(key, [])
        }
        this.groups.get(key).push(value)
    }

    public asHist(dedup = false): Histogram<K> {
        const hist = new Histogram<K>()
        this.groups.forEach((values, key) => {
            if (dedup) {
                hist.bump(key, new Set(values).size)
            } else {
                hist.bump(key, values.length)
            }
        })
        return hist
    }

    /**
     * Given a group, creates a kind of histogram.
     * E.g: if the Group is {'2022-03-16' --> ['Pieter Vander Vennet', 'Pieter Vander Vennet', 'Seppe Santens']}, the resulting 'groupedHists' will be:
     * [['Pieter Vander Vennet', {'2022-03-16' --> 2}],['Seppe Santens', {'2022-03-16' --> 1}]]
     */
    asGroupedHists(): [V, Histogram<K>][] {

        const allHists = new Map<V, Histogram<K>>()

        const allValues = new Set<V>();
        Array.from(this.groups.values()).forEach(vs =>
            vs.forEach(v => {
                allValues.add(v)
            })
        )

        allValues.forEach(v => allHists.set(v, new Histogram<K>()))

        this.groups.forEach((values, key) => {
            values.forEach(v => {
                allHists.get(v).bump(key)
            })
        })

        return Array.from(allHists.entries())
    }
}

/**
 *
 * @param hists
 */
function stackHists<K, V>(hists: [V, Histogram<K>][]): [V, Histogram<K>][] {
    const runningTotals = new Histogram<K>()
    const result: [V, Histogram<K>][] = []
    hists.forEach(vhist => {
        const hist = vhist[1]
        const clone = hist.Clone()
        clone.bumpHist(runningTotals)
        runningTotals.bumpHist(hist)
        result.push([vhist[0], clone])
    })
    result.reverse(/* Changes in place, safe copy*/)
    return result
}

/**
 * Given histograms which should be shown as bars on top of each other, creates a new list of histograms with adjusted heights in order to create a coherent sum
 * e.g.: for a given day, there are 2 deletions, 3 additions and 5 answers, this will be ordered as 2, 5 and 10 in order to mimic a coherent bar
 * @param hists
 */
function stackHistsSimple<K>(hists: Histogram<K>[]): Histogram<K>[] {
    const runningTotals = new Histogram<K>()
    const result: Histogram<K>[] = []
    for (const hist of hists) {
        const clone = hist.Clone()
        clone.bumpHist(runningTotals) // "Copies" one histogram into the other
        runningTotals.bumpHist(hist)
        result.push(clone)
    }
    result.reverse(/* Changes in place, safe copy*/)
    return result
}

function createActualChangesGraph(allFeatures: ChangeSetData[], appliedFilterDescription: string) {
    const metadataOptions = {
        "answer": "#5b5bdc",
        "create": "#46ea46",
        "move": "#ffa600",
        "deletion": "#ff0000",
        "soft-delete": "#ff8888",
        "add-image": "#8888ff",
        "import": "#00ff00",
        "conflation": "#ffff00",
        "split": "#000000",
        "relation-fix": "#cccccc",
        "delete-image": "#ff00ff"
    }

    const metadataKeys: string[] = Object.keys(metadataOptions)
    const histograms: Map<string, Histogram<string>> = new Map<string, Histogram<string>>() // {metakey --> Histogram<date>}
    allFeatures.forEach(f => {
        const day = f.properties.date.substr(0, 10)

        for (const key of metadataKeys) {
            const v = f.properties.metadata[key]
            if (v === undefined) {
                continue
            }
            const count = Number(v)
            if (isNaN(count)) {
                continue
            }
            if (!histograms.has(key)) {
                histograms.set(key, new Histogram<string>())
            }
            histograms.get(key).bump(day, count)
        }

    })


    const entries = stackHists(Array.from(histograms.entries()))

    const allGraphs = entries.map(([name, stackedHist]) => {
            const hist = histograms.get(name)
            return stackedHist
                .keyToDate(true)
                .asBar({name: `${name} (${hist.total()})`, color: metadataOptions[name]});
        }
    )

    createGraph("Actual changes" + appliedFilterDescription, ...allGraphs)
}

async function createGraphs(allFeatures: ChangeSetData[], appliedFilterDescription: string, cutoff = undefined) {
    const hist = new Histogram<string>(allFeatures.map(f => f.properties.metadata.theme))
    await hist
        .createOthersCategory("other", cutoff ?? 20)
        .addCountToName()
        .asBar({name: "Changesets per theme (bar)" + appliedFilterDescription})
        .render()


    await new Histogram<string>(allFeatures.map(f => f.properties.user))
        .binPerCount()
        .stringifyName()
        .createOthersCategory("25 or more", (key, _) => Number(key) >= (cutoff ?? 25)).asBar(
            {
                compare: (a, b) => Number(a) - Number(b),
                name: "Contributors per changeset count" + appliedFilterDescription
            })
        .render()


    const csPerDay = new Histogram<string>(allFeatures.map(f => f.properties.date.substr(0, 10)))

    const perDayLine = csPerDay
        .keyToDate()
        .asLine({
            compare: (a, b) => a.getTime() - b.getTime(),
            name: "Changesets per day" + appliedFilterDescription
        })

    const perDayAvg = csPerDay.asRunningAverages(key => {
        const keys = []
        for (let i = 0; i < 7; i++) {
            const otherDay = new Date(new Date(key).getTime() - i * 1000 * 60 * 60 * 24)
            keys.push(otherDay.toISOString().substr(0, 10))
        }
        return keys
    })
        .keyToDate(true)
        .asLine({
            compare: (a, b) => a.getTime() - b.getTime(),
            name: "Rolling 7 day average" + appliedFilterDescription
        })

    const perDayAvgMonth = csPerDay.asRunningAverages(key => {
        const keys = []
        for (let i = 0; i < 31; i++) {
            const otherDay = new Date(new Date(key).getTime() - i * 1000 * 60 * 60 * 24)
            keys.push(otherDay.toISOString().substr(0, 10))
        }
        return keys
    })
        .keyToDate()
        .asLine({
            compare: (a, b) => a.getTime() - b.getTime(),
            name: "Rolling 31 day average" + appliedFilterDescription
        })

    await createGraph("Changesets per day (line)" + appliedFilterDescription, perDayLine, perDayAvg, perDayAvgMonth)


    await new Histogram<string>(allFeatures.map(f => f.properties.metadata.host))
        .asPie({
            name: "Changesets per host" + appliedFilterDescription
        }).render()

    await new Histogram<string>(allFeatures.map(f => f.properties.metadata.theme))
        .createOthersCategory("< 25 changesets", (cutoff ?? 25))
        .addCountToName()
        .asPie({
            name: "Changesets per theme (pie)" + appliedFilterDescription
        }).render()

    Group.createStackedBarChartPerDay(
        "Changesets per theme" + appliedFilterDescription,
        allFeatures,
        f => f.properties.metadata.theme,
        cutoff ?? 25
    )


    Group.createStackedBarChartPerDay(
        "Changesets per version number" + appliedFilterDescription,
        allFeatures,
        f => f.properties.editor?.substr("MapComplete ".length, 6)?.replace(/[a-zA-Z-/]/g, '') ?? "UNKNOWN",
        cutoff ?? 1
    )

    Group.createStackedBarChartPerDay(
        "Changesets per minor version number" + appliedFilterDescription,
        allFeatures,
        f => {
            const base = f.properties.editor?.substr("MapComplete ".length)?.replace(/[a-zA-Z-/]/g, '') ?? "UNKNOWN"
            const [major, minor, patch] = base.split(".")
            return major + "." + minor

        },
        cutoff ?? 1
    )

    Group.createStackedBarChartPerDay(
        "Deletion-changesets per theme" + appliedFilterDescription,
        allFeatures.filter(f => f.properties.delete > 0),
        f => f.properties.metadata.theme,
        cutoff ?? 1
    )

    {
        // Contributors (unique + unique new) per day
        const contributorCountPerDay = new Group<string, string>()
        const newContributorsPerDay = new Group<string, string>()
        const seenContributors = new Set<string>()
        allFeatures.forEach(f => {
            const user = f.properties.user
            const day = f.properties.date.substr(0, 10)
            contributorCountPerDay.bump(day, user)
            if (!seenContributors.has(user)) {
                seenContributors.add(user)
                newContributorsPerDay.bump(day, user)
            }
        })
        const total = new Set(allFeatures.map(f => f.properties.user)).size
        await createGraph(
            `Contributors per day${appliedFilterDescription}`,
            contributorCountPerDay
                .asHist(true)
                .keyToDate(true)
                .asBar({
                    name: `Unique contributors per day (${total} total)`
                }),
            newContributorsPerDay
                .asHist(true)
                .keyToDate(true)
                .asBar({
                    name: "New, unique contributors per day"
                }),
        )

        await createActualChangesGraph(allFeatures, appliedFilterDescription);
    }


}

async function createMiscGraphs(allFeatures: ChangeSetData[], emptyCS: ChangeSetData[]) {
    await new Histogram(emptyCS.map(f => f.properties.date)).keyToDate().asBar({
        name: "Empty changesets by date"
    }).render()
    const geojson = {
        type: "FeatureCollection",
        features: Utils.NoNull(allFeatures
            .map(f => {
                try {
                    const point = GeoOperations.centerpoint(f.geometry);
                    point.properties = {...f.properties, ...f.properties.metadata}
                    delete point.properties.metadata
                    for (const key in f.properties.metadata) {
                        point.properties[key] = f.properties.metadata[key]
                    }

                    return point
                } catch (e) {
                    console.error("Could not create center point: ", e, f)
                    return undefined
                }
            }))
    }
    writeFileSync("centerpoints.geojson", JSON.stringify(geojson, undefined, 2))
}

async function main(): Promise<void> {
    if (!existsSync("graphs")) {
        mkdirSync("graphs")
    }

    const targetDir = "Docs/Tools/stats"
    if (process.argv.indexOf("--no-download") < 0) {
        await new StatsDownloader(targetDir).DownloadStats()
    }
    const allPaths = readdirSync(targetDir)
        .filter(p => p.startsWith("stats.") && p.endsWith(".json"));
    let allFeatures: ChangeSetData[] = [].concat(...allPaths
        .map(path => JSON.parse(readFileSync("Docs/Tools/stats/" + path, "utf-8")).features
            .map(cs => ChangesetDataTools.cleanChangesetData(cs))));
    allFeatures = allFeatures.filter(f => f.properties.editor === null || f.properties.editor.toLowerCase().startsWith("mapcomplete"))

    const emptyCS = allFeatures.filter(f => f.properties.metadata.theme === "EMPTY CS")
    allFeatures = allFeatures.filter(f => f.properties.metadata.theme !== "EMPTY CS")

    const noEditor = allFeatures.filter(f => f.properties.editor === null).map(f => "https://www.osm.org/changeset/" + f.id)
    writeFileSync("missing_editor.json", JSON.stringify(noEditor, null, "  "));

    if (process.argv.indexOf("--no-graphs") >= 0) {
        return
    }
    const allFiles = readdirSync("Docs/Tools/stats").filter(p => p.endsWith(".json"))
    writeFileSync("Docs/Tools/stats/file-overview.json", JSON.stringify(allFiles))
    
    /* 
   await createMiscGraphs(allFeatures, emptyCS)

   const grbOnly = allFeatures.filter(f => f.properties.metadata.theme === "grb")
   allFeatures = allFeatures.filter(f => f.properties.metadata.theme !== "grb")
 await createGraphs(allFeatures, "")
   await createGraphs(allFeatures.filter(f => f.properties.date.startsWith("2020")), " in 2020")
   await createGraphs(allFeatures.filter(f => f.properties.date.startsWith("2021")), " in 2021")
   await createGraphs(allFeatures.filter(f => f.properties.date.startsWith("2022")), " in 2022")
   await createGraphs(allFeatures.filter(f => f.properties.metadata.theme === "toerisme_vlaanderen"), " met pin je punt", 0)
   await createGraphs(grbOnly, " with the GRB import tool", 0)
*/
}

main().then(_ => console.log("All done!"))

