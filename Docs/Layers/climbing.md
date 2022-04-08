

 climbing 
==========



<img src='https://mapcomplete.osm.be/./assets/themes/climbing/climbing_no_rope.svg' height="100px"> 

A climbing opportunity






  - This layer is shown at zoomlevel **10** and higher
  - This layer will automatically load  [climbing](./climbing.md)  into the layout as it depends on it:  A calculated tag loads features from this layer (calculatedTag[0] which calculates the value for _embedding_feature_properties)
  - This layer will automatically load  [climbing_route](./climbing_route.md)  into the layout as it depends on it:  A calculated tag loads features from this layer (calculatedTag[8] which calculates the value for _contained_climbing_routes_properties)
  - This layer is needed as dependency for layer [climbing_club](#climbing_club)
  - This layer is needed as dependency for layer [climbing_gym](#climbing_gym)
  - This layer is needed as dependency for layer [climbing_route](#climbing_route)
  - This layer is needed as dependency for layer [climbing](#climbing)
  - This layer is needed as dependency for layer [maybe_climbing](#maybe_climbing)




#### Themes using this layer 





  - [climbing](https://mapcomplete.osm.be/climbing)




 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - <a href='https://wiki.openstreetmap.org/wiki/Key:sport' target='_blank'>sport</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:sport%3Dclimbing' target='_blank'>climbing</a>
  - climbing!~^route$
  - leisure!~^sports_centre$
  - climbing!~^route_top$
  - climbing!~^route_bottom$


[Execute on overpass](http://overpass-turbo.eu/?Q=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3B(%20%20%20%20nwr%5B%22sport%22%3D%22climbing%22%5D%5B%22climbing%22!~%22%5Eroute%24%22%5D%5B%22climbing%22!~%22%5Eroute_top%24%22%5D%5B%22climbing%22!~%22%5Eroute_bottom%24%22%5D%5B%22leisure%22!~%22%5Esports_centre%24%22%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B)



 Supported attributes 
----------------------



**Warning** This quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/name#values) [name](https://wiki.openstreetmap.org/wiki/Key:name) | [string](../SpecialInputElements.md#string) | [](https://wiki.openstreetmap.org/wiki/Tag:name%3D)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing#values) [climbing](https://wiki.openstreetmap.org/wiki/Key:climbing) | Multiple choice | [boulder](https://wiki.openstreetmap.org/wiki/Tag:climbing%3Dboulder) [crag](https://wiki.openstreetmap.org/wiki/Tag:climbing%3Dcrag) [area](https://wiki.openstreetmap.org/wiki/Tag:climbing%3Darea)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/rock#values) [rock](https://wiki.openstreetmap.org/wiki/Key:rock) | [string](../SpecialInputElements.md#string) | [limestone](https://wiki.openstreetmap.org/wiki/Tag:rock%3Dlimestone)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/url#values) [url](https://wiki.openstreetmap.org/wiki/Key:url) | [url](../SpecialInputElements.md#url) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/_embedding_feature:access#values) [_embedding_feature:access](https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dyes) [permit](https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dpermit) [customers](https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dcustomers) [members](https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dmembers) [no](https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/access#values) [access](https://wiki.openstreetmap.org/wiki/Key:access) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:access%3Dyes) [permit](https://wiki.openstreetmap.org/wiki/Tag:access%3Dpermit) [customers](https://wiki.openstreetmap.org/wiki/Tag:access%3Dcustomers) [members](https://wiki.openstreetmap.org/wiki/Tag:access%3Dmembers) [no](https://wiki.openstreetmap.org/wiki/Tag:access%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/access:description#values) [access:description](https://wiki.openstreetmap.org/wiki/Key:access:description) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:length#values) [climbing:length](https://wiki.openstreetmap.org/wiki/Key:climbing:length) | [pnat](../SpecialInputElements.md#pnat) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:grade:french:min#values) [climbing:grade:french:min](https://wiki.openstreetmap.org/wiki/Key:climbing:grade:french:min) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:grade:french:max#values) [climbing:grade:french:max](https://wiki.openstreetmap.org/wiki/Key:climbing:grade:french:max) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:boulder#values) [climbing:boulder](https://wiki.openstreetmap.org/wiki/Key:climbing:boulder) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dno) [limited](https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dlimited)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:toprope#values) [climbing:toprope](https://wiki.openstreetmap.org/wiki/Key:climbing:toprope) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:climbing:toprope%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:climbing:toprope%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:sport#values) [climbing:sport](https://wiki.openstreetmap.org/wiki/Key:climbing:sport) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:climbing:sport%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:climbing:sport%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:traditional#values) [climbing:traditional](https://wiki.openstreetmap.org/wiki/Key:climbing:traditional) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:climbing:traditional%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:climbing:traditional%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/climbing:speed#values) [climbing:speed](https://wiki.openstreetmap.org/wiki/Key:climbing:speed) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:climbing:speed%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:climbing:speed%3Dno)




### images 



_This tagrendering has no question and is thus read-only_





### minimap 



_This tagrendering has no question and is thus read-only_





### Contained routes length hist 



_This tagrendering has no question and is thus read-only_





### Contained routes hist 



_This tagrendering has no question and is thus read-only_





### Contained_climbing_routes 



_This tagrendering has no question and is thus read-only_



Only visible if `_contained_climbing_routes~^..*$` is shown



### name 



The question is **What is the name of this climbing opportunity?**

This rendering asks information about the property  [name](https://wiki.openstreetmap.org/wiki/Key:name) 
This is rendered with `<strong>{name}</strong>`



  - **This climbing opportunity doesn't have a name** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:noname' target='_blank'>noname</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:noname%3Dyes' target='_blank'>yes</a>




### Type 



The question is **What kind of climbing opportunity is this?**





  - **A climbing boulder - a single rock or cliff with one or a few climbing routes which can be climbed safely without rope** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing' target='_blank'>climbing</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing%3Dboulder' target='_blank'>boulder</a>
  - **A climbing crag - a single rock or cliff with at least a few climbing routes** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing' target='_blank'>climbing</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing%3Dcrag' target='_blank'>crag</a>
  - **A climbing area with one or more climbing crags and/or boulders** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing' target='_blank'>climbing</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing%3Darea' target='_blank'>area</a>




### Rock type (crag/rock/cliff only) 



The question is **What is the rock type here?**

This rendering asks information about the property  [rock](https://wiki.openstreetmap.org/wiki/Key:rock) 
This is rendered with `The rock type is {rock}`



  - **Limestone** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:rock' target='_blank'>rock</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:rock%3Dlimestone' target='_blank'>limestone</a>


Only visible if `climbing=crag|natural=cliff|natural=bare_rock` is shown



### Website 



The question is **Is there a (unofficial) website with more informations (e.g. topos)?**

This rendering asks information about the property  [url](https://wiki.openstreetmap.org/wiki/Key:url) 
This is rendered with `<a href='{url}' target='_blank'>{url}</a>`

Only visible if `leisure!~^sports_centre$&sport=climbing` is shown



### Access from containing feature 



_This tagrendering has no question and is thus read-only_





  - **<span class='subtle'>The <a href='#{_embedding_feature:id}'>containing feature</a> states that this is</span> publicly accessible<br/>{_embedding_feature:access:description}** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access' target='_blank'>_embedding_feature:access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dyes' target='_blank'>yes</a>
  - **<span class='subtle'>The <a href='#{_embedding_feature:id}'>containing feature</a> states that </span> a permit is needed to access<br/>{_embedding_feature:access:description}** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access' target='_blank'>_embedding_feature:access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dpermit' target='_blank'>permit</a>
  - **<span class='subtle'>The <a href='#{_embedding_feature:id}'>containing feature</a> states that this is</span> only accessible to customers<br/>{_embedding_feature:access:description}** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access' target='_blank'>_embedding_feature:access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dcustomers' target='_blank'>customers</a>
  - **<span class='subtle'>The <a href='#{_embedding_feature:id}'>containing feature</a> states that this is</span> only accessible to club members<br/>{_embedding_feature:access:description}** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access' target='_blank'>_embedding_feature:access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dmembers' target='_blank'>members</a>
  - **Not accessible as stated by <a href='#{_embedding_feature:id}'>the containing feature</a>** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:_embedding_feature:access' target='_blank'>_embedding_feature:access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:_embedding_feature:access%3Dno' target='_blank'>no</a>


Only visible if `_embedding_feature:access~^..*$` is shown



### Access 



The question is **Who can access here?**





  - **Publicly accessible to anyone** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:access' target='_blank'>access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:access%3Dyes' target='_blank'>yes</a>
  - **You need a permit to access here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:access' target='_blank'>access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:access%3Dpermit' target='_blank'>permit</a>
  - **Only customers** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:access' target='_blank'>access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:access%3Dcustomers' target='_blank'>customers</a>
  - **Only club members** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:access' target='_blank'>access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:access%3Dmembers' target='_blank'>members</a>
  - **Not accessible** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:access' target='_blank'>access</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:access%3Dno' target='_blank'>no</a>


Only visible if `climbing!~^no$&sport=climbing|climbing:sport=yes&access~^..*$|` is shown



### Access description (without _embedding_feature:access:description) 



_This tagrendering has no question and is thus read-only_

This rendering asks information about the property  [access:description](https://wiki.openstreetmap.org/wiki/Key:access:description) 
This is rendered with `{access:description}`



### Avg length? 



The question is **What is the (average) length of the routes in meters?**

This rendering asks information about the property  [climbing:length](https://wiki.openstreetmap.org/wiki/Key:climbing:length) 
This is rendered with `The routes are <b>{canonical(climbing:length)}</b> long on average`

Only visible if `climbing!~^route$&climbing:toprope!~^no$&sport=climbing|climbing:sport=yes|climbing=traditional|climbing=gym` is shown



### Difficulty-min 



The question is **What is the grade of the easiest route here, according to the french classification system?**

This rendering asks information about the property  [climbing:grade:french:min](https://wiki.openstreetmap.org/wiki/Key:climbing:grade:french:min) 
This is rendered with `The lowest grade is {climbing:grade:french:min} according to the french/belgian system`

Only visible if `climbing!~^route$&climbing:sport=yes|sport=climbing` is shown



### Difficulty-max 



The question is **What is the highest grade route here, according to the french classification system?**

This rendering asks information about the property  [climbing:grade:french:max](https://wiki.openstreetmap.org/wiki/Key:climbing:grade:french:max) 
This is rendered with `The highest grade is {climbing:grade:french:max} according to the french/belgian system`

Only visible if `climbing!~^route$&climbing:sport=yes|sport=climbing` is shown



### Boldering? 



The question is **Is bouldering possible here?**





  - **Bouldering is possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:boulder' target='_blank'>climbing:boulder</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dyes' target='_blank'>yes</a>
  - **Bouldering is not possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:boulder' target='_blank'>climbing:boulder</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dno' target='_blank'>no</a>
  - **Bouldering is possible, allthough there are only a few routes** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:boulder' target='_blank'>climbing:boulder</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:boulder%3Dlimited' target='_blank'>limited</a>
  - **There are {climbing:boulder} boulder routes** corresponds with climbing:boulder~^..*$_This option cannot be chosen as answer_


Only visible if `climbing:sport=yes|sport=climbing` is shown



### Toproping? 



The question is **Is toprope climbing possible here?**





  - **Toprope climbing is possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:toprope' target='_blank'>climbing:toprope</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:toprope%3Dyes' target='_blank'>yes</a>
  - **Toprope climbing is not possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:toprope' target='_blank'>climbing:toprope</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:toprope%3Dno' target='_blank'>no</a>
  - **There are {climbing:toprope} toprope routes** corresponds with climbing:toprope~^..*$_This option cannot be chosen as answer_


Only visible if `climbing:sport=yes|sport=climbing` is shown



### Sportclimbing? 



The question is **Is sport climbing possible here on fixed anchors?**





  - **Sport climbing is possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:sport' target='_blank'>climbing:sport</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:sport%3Dyes' target='_blank'>yes</a>
  - **Sport climbing is not possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:sport' target='_blank'>climbing:sport</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:sport%3Dno' target='_blank'>no</a>
  - **There are {climbing:sport} sport climbing routes** corresponds with climbing:sport~^..*$_This option cannot be chosen as answer_


Only visible if `climbing:sport=yes|sport=climbing` is shown



### Traditional climbing? 



The question is **Is traditional climbing possible here (using own gear e.g. chocks)?**





  - **Traditional climbing is possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:traditional' target='_blank'>climbing:traditional</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:traditional%3Dyes' target='_blank'>yes</a>
  - **Traditional climbing is not possible here** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:traditional' target='_blank'>climbing:traditional</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:traditional%3Dno' target='_blank'>no</a>
  - **There are {climbing:traditional} traditional climbing routes** corresponds with climbing:traditional~^..*$_This option cannot be chosen as answer_


Only visible if `climbing:sport=yes|sport=climbing` is shown



### Speed climbing? 



The question is **Is there a speed climbing wall?**





  - **There is a speed climbing wall** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:speed' target='_blank'>climbing:speed</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:speed%3Dyes' target='_blank'>yes</a>
  - **There is no speed climbing wall** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:climbing:speed' target='_blank'>climbing:speed</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:climbing:speed%3Dno' target='_blank'>no</a>
  - **There are {climbing:speed} speed climbing walls** corresponds with climbing:speed~^..*$_This option cannot be chosen as answer_


Only visible if `leisure=sports_centre&climbing:sport=yes|sport=climbing` is shown



### questions 



_This tagrendering has no question and is thus read-only_





### reviews 



_This tagrendering has no question and is thus read-only_

 

This document is autogenerated from [assets/themes/climbing/climbing.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/themes/climbing/climbing.json)