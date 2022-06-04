

 friture 
=========



<img src='https://mapcomplete.osm.be/circle:white;./assets/layers/food/restaurant.svg' height="100px"> 

A layer showing restaurants and fast-food amenities (with a special rendering for friteries)






  - This layer is shown at zoomlevel **12** and higher




#### Themes using this layer 





  - [fritures](https://mapcomplete.osm.be/fritures)




 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - cuisine~^(.*;)?friture(;.*)?$
  - <a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dfast_food' target='_blank'>fast_food</a>|<a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Drestaurant' target='_blank'>restaurant</a>


[Execute on overpass](http://overpass-turbo.eu/?Q=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3B(%20%20%20%20nwr%5B%22amenity%22%3D%22fast_food%22%5D%5B%22cuisine%22~%22%5E(.*%3B)%3Ffriture(%3B.*)%3F%24%22%5D(%7B%7Bbbox%7D%7D)%3B%0A%20%20%20%20nwr%5B%22amenity%22%3D%22restaurant%22%5D%5B%22cuisine%22~%22%5E(.*%3B)%3Ffriture(%3B.*)%3F%24%22%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B)



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/name#values) [name](https://wiki.openstreetmap.org/wiki/Key:name) | [string](../SpecialInputElements.md#string) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/amenity#values) [amenity](https://wiki.openstreetmap.org/wiki/Key:amenity) | Multiple choice | [fast_food](https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dfast_food) [restaurant](https://wiki.openstreetmap.org/wiki/Tag:amenity%3Drestaurant)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/opening_hours#values) [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) | [opening_hours](../SpecialInputElements.md#opening_hours) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/website#values) [website](https://wiki.openstreetmap.org/wiki/Key:website) | [url](../SpecialInputElements.md#url) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/email#values) [email](https://wiki.openstreetmap.org/wiki/Key:email) | [email](../SpecialInputElements.md#email) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/phone#values) [phone](https://wiki.openstreetmap.org/wiki/Key:phone) | [phone](../SpecialInputElements.md#phone) | 
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/wheelchair#values) [wheelchair](https://wiki.openstreetmap.org/wiki/Key:wheelchair) | Multiple choice | [designated](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Ddesignated) [yes](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dyes) [limited](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dlimited) [no](https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/cuisine#values) [cuisine](https://wiki.openstreetmap.org/wiki/Key:cuisine) | [string](../SpecialInputElements.md#string) | [pizza](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dpizza) [friture](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dfriture) [pasta](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dpasta) [kebab](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dkebab) [sandwich](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dsandwich) [burger](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dburger) [sushi](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dsushi) [coffee](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dcoffee) [italian](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Ditalian) [french](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dfrench) [chinese](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dchinese) [greek](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dgreek) [indian](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dindian) [turkish](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dturkish) [thai](https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dthai)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/takeaway#values) [takeaway](https://wiki.openstreetmap.org/wiki/Key:takeaway) | Multiple choice | [only](https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Donly) [yes](https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/diet:vegetarian#values) [diet:vegetarian](https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian) | Multiple choice | [no](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dno) [limited](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dlimited) [yes](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dyes) [only](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Donly)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/diet:vegan#values) [diet:vegan](https://wiki.openstreetmap.org/wiki/Key:diet:vegan) | Multiple choice | [no](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dno) [limited](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dlimited) [yes](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dyes) [only](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Donly)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/diet:halal#values) [diet:halal](https://wiki.openstreetmap.org/wiki/Key:diet:halal) | Multiple choice | [no](https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dno) [limited](https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dlimited) [yes](https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dyes) [only](https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Donly)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/diet:vegetarian#values) [diet:vegetarian](https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dyes) [limited](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dlimited) [no](https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/diet:vegan#values) [diet:vegan](https://wiki.openstreetmap.org/wiki/Key:diet:vegan) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dyes) [limited](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dlimited) [no](https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/friture:oil#values) [friture:oil](https://wiki.openstreetmap.org/wiki/Key:friture:oil) | Multiple choice | [vegetable](https://wiki.openstreetmap.org/wiki/Tag:friture:oil%3Dvegetable) [animal](https://wiki.openstreetmap.org/wiki/Tag:friture:oil%3Danimal)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/reusable_packaging:accept#values) [reusable_packaging:accept](https://wiki.openstreetmap.org/wiki/Key:reusable_packaging:accept) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Dno) [only](https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Donly)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/service:electricity#values) [service:electricity](https://wiki.openstreetmap.org/wiki/Key:service:electricity) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dyes) [limited](https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dlimited) [ask](https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dask) [no](https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dno)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/dog#values) [dog](https://wiki.openstreetmap.org/wiki/Key:dog) | Multiple choice | [yes](https://wiki.openstreetmap.org/wiki/Tag:dog%3Dyes) [no](https://wiki.openstreetmap.org/wiki/Tag:dog%3Dno) [leashed](https://wiki.openstreetmap.org/wiki/Tag:dog%3Dleashed) [unleashed](https://wiki.openstreetmap.org/wiki/Tag:dog%3Dunleashed)




### images 



This tagrendering has no question and is thus read-only





### Name 



The question is  What is the name of this restaurant?

This rendering asks information about the property  [name](https://wiki.openstreetmap.org/wiki/Key:name) 

This is rendered with  The name of this restaurant is {name}





### Fastfood vs restaurant 



The question is  What type of business is this?





  - This is a fastfood-business, focussed on fast service. If seating is available, these are rather limited and functional. corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dfast_food' target='_blank'>fast_food</a>
  - A <b>restaurant</b>, focussed on creating a nice experience where one is served at the table corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Drestaurant' target='_blank'>restaurant</a>




### opening_hours 



The question is  What are the opening hours of {title()}?

This rendering asks information about the property  [opening_hours](https://wiki.openstreetmap.org/wiki/Key:opening_hours) 

This is rendered with  <h3>Opening hours</h3>{opening_hours_table(opening_hours)}





### website 



The question is  What is the website of {title()}?

This rendering asks information about the property  [website](https://wiki.openstreetmap.org/wiki/Key:website) 

This is rendered with  <a href='{website}' target='_blank'>{website}</a>





  - <a href='{contact:website}' target='_blank'>{contact:website}</a> corresponds with  contact:website~^..*$
  - This option cannot be chosen as answer




### email 



The question is  What is the email address of {title()}?

This rendering asks information about the property  [email](https://wiki.openstreetmap.org/wiki/Key:email) 

This is rendered with  <a href='mailto:{email}' target='_blank'>{email}</a>





  - <a href='mailto:{contact:email}' target='_blank'>{contact:email}</a> corresponds with  contact:email~^..*$
  - This option cannot be chosen as answer




### phone 



The question is  What is the phone number of {title()}?

This rendering asks information about the property  [phone](https://wiki.openstreetmap.org/wiki/Key:phone) 

This is rendered with  <a href='tel:{phone}'>{phone}</a>





  - <a href='tel:{contact:phone}'>{contact:phone}</a> corresponds with  contact:phone~^..*$
  - This option cannot be chosen as answer




### payment-options 



The question is  Which methods of payment are accepted here?





  - Cash is accepted here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:payment:cash' target='_blank'>payment:cash</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:cash%3Dyes' target='_blank'>yes</a>
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:cash' target='_blank'>payment:cash</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:cash%3Dno' target='_blank'>no</a>
  - Payment cards are accepted here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:payment:cards' target='_blank'>payment:cards</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:cards%3Dyes' target='_blank'>yes</a>
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:cards' target='_blank'>payment:cards</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:cards%3Dno' target='_blank'>no</a>




### wheelchair-access 



The question is  Is this place accessible with a wheelchair?





  - This place is specially adapted for wheelchair users corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:wheelchair' target='_blank'>wheelchair</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Ddesignated' target='_blank'>designated</a>
  - This place is easily reachable with a wheelchair corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:wheelchair' target='_blank'>wheelchair</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dyes' target='_blank'>yes</a>
  - It is possible to reach this place in a wheelchair, but it is not easy corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:wheelchair' target='_blank'>wheelchair</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dlimited' target='_blank'>limited</a>
  - This place is not reachable with a wheelchair corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:wheelchair' target='_blank'>wheelchair</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:wheelchair%3Dno' target='_blank'>no</a>




### Cuisine 



The question is  Which food is served here?

This rendering asks information about the property  [cuisine](https://wiki.openstreetmap.org/wiki/Key:cuisine) 

This is rendered with  This place mostly serves {cuisine}





  - This is a pizzeria corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dpizza' target='_blank'>pizza</a>
  - This is a friture corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dfriture' target='_blank'>friture</a>
  - Mainly serves pasta corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dpasta' target='_blank'>pasta</a>
  - This is kebab shop corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dkebab' target='_blank'>kebab</a>
  - This is a sandwichbar corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dsandwich' target='_blank'>sandwich</a>
  - Burgers are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dburger' target='_blank'>burger</a>
  - Sushi is served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dsushi' target='_blank'>sushi</a>
  - Coffee is served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dcoffee' target='_blank'>coffee</a>
  - This is an italian restaurant (which serves more then pasta and pizza) corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Ditalian' target='_blank'>italian</a>
  - French dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dfrench' target='_blank'>french</a>
  - Chinese dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dchinese' target='_blank'>chinese</a>
  - Greek dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dgreek' target='_blank'>greek</a>
  - Indian dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dindian' target='_blank'>indian</a>
  - Turkish dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dturkish' target='_blank'>turkish</a>
  - Thai dishes are served here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:cuisine' target='_blank'>cuisine</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:cuisine%3Dthai' target='_blank'>thai</a>




### Takeaway 



The question is  Does this place offer takea-way?





  - This is a take-away only business corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:takeaway' target='_blank'>takeaway</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Donly' target='_blank'>only</a>
  - Take-away is possible here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:takeaway' target='_blank'>takeaway</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Dyes' target='_blank'>yes</a>
  - Take-away is not possible here corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:takeaway' target='_blank'>takeaway</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:takeaway%3Dno' target='_blank'>no</a>




### Vegetarian (no friture) 



The question is  Does this restaurant have a vegetarian option?





  - No vegetarian options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dno' target='_blank'>no</a>
  - Some vegetarian options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dlimited' target='_blank'>limited</a>
  - Vegetarian options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dyes' target='_blank'>yes</a>
  - All dishes are vegetarian corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Donly' target='_blank'>only</a>




### Vegan (no friture) 



The question is  Does this business serve vegan meals?





  - No vegan options available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dno' target='_blank'>no</a>
  - Some vegan options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dlimited' target='_blank'>limited</a>
  - Vegan options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dyes' target='_blank'>yes</a>
  - All dishes are vegan corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Donly' target='_blank'>only</a>




### halal (no friture) 



The question is  Does this restaurant offer a halal menu?





  - There are no halal options available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:halal' target='_blank'>diet:halal</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dno' target='_blank'>no</a>
  - There is a small halal menu corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:halal' target='_blank'>diet:halal</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dlimited' target='_blank'>limited</a>
  - There is a halal menu corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:halal' target='_blank'>diet:halal</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Dyes' target='_blank'>yes</a>
  - Only halal options are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:halal' target='_blank'>diet:halal</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:halal%3Donly' target='_blank'>only</a>




### friture-vegetarian 



The question is  Does this fries shop have vegetarian snacks?





  - Vegetarian snacks are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dyes' target='_blank'>yes</a>
  - Only a small selection of snacks are vegetarian corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dlimited' target='_blank'>limited</a>
  - No vegetarian snacks are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian' target='_blank'>diet:vegetarian</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegetarian%3Dno' target='_blank'>no</a>


Only visible if  `cuisine=friture`  is shown



### friture-vegan 



The question is  Does this fries shop have vegan snacks?





  - Vegan snacks are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dyes' target='_blank'>yes</a>
  - A small selection of vegan snacks are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dlimited' target='_blank'>limited</a>
  - No vegan snacks are available corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:diet:vegan' target='_blank'>diet:vegan</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:diet:vegan%3Dno' target='_blank'>no</a>


Only visible if  `cuisine=friture`  is shown



### friture-oil 



The question is  Does this fries shop use vegetable or animal cooking?





  - Vegetable oil corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:friture:oil' target='_blank'>friture:oil</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:friture:oil%3Dvegetable' target='_blank'>vegetable</a>
  - Animal oil corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:friture:oil' target='_blank'>friture:oil</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:friture:oil%3Danimal' target='_blank'>animal</a>


Only visible if  `cuisine=friture`  is shown



### friture-take-your-container 



The question is  If you bring your own container (such as a cooking pot and small pots), is it used to package your order?<br/>





  - You can bring <b>your own containers</b> to get your order, saving on single-use packaging material and thus waste corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:reusable_packaging:accept' target='_blank'>reusable_packaging:accept</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Dyes' target='_blank'>yes</a>
  - Bringing your own container is <b>not allowed</b> corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:reusable_packaging:accept' target='_blank'>reusable_packaging:accept</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Dno' target='_blank'>no</a>
  - You <b>must</b> bring your own container to order here. corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:reusable_packaging:accept' target='_blank'>reusable_packaging:accept</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:reusable_packaging:accept%3Donly' target='_blank'>only</a>


Only visible if  `cuisine=friture`  is shown



### service:electricity 



The question is  Does this amenity have electrical outlets, available to customers when they are inside?





  - There are plenty of domestic sockets available to customers seated indoors, where they can charge their electronics corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:service:electricity' target='_blank'>service:electricity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dyes' target='_blank'>yes</a>
  - There are a few domestic sockets available to customers seated indoors, where they can charge their electronics corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:service:electricity' target='_blank'>service:electricity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dlimited' target='_blank'>limited</a>
  - There are no sockets available indoors to customers, but charging might be possible if the staff is asked corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:service:electricity' target='_blank'>service:electricity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dask' target='_blank'>ask</a>
  - There are a no domestic sockets available to customers seated indoors corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:service:electricity' target='_blank'>service:electricity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:electricity%3Dno' target='_blank'>no</a>




### dog-access 



The question is  Are dogs allowed in this business?





  - Dogs are allowed corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:dog' target='_blank'>dog</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:dog%3Dyes' target='_blank'>yes</a>
  - Dogs are <b>not</b> allowed corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:dog' target='_blank'>dog</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:dog%3Dno' target='_blank'>no</a>
  - Dogs are allowed, but they have to be leashed corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:dog' target='_blank'>dog</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:dog%3Dleashed' target='_blank'>leashed</a>
  - Dogs are allowed and can run around freely corresponds with  <a href='https://wiki.openstreetmap.org/wiki/Key:dog' target='_blank'>dog</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:dog%3Dunleashed' target='_blank'>unleashed</a>




### reviews 



This tagrendering has no question and is thus read-only





### questions 



This tagrendering has no question and is thus read-only





### minimap 



This tagrendering has no question and is thus read-only

 

This document is autogenerated from [assets/themes/fritures/fritures.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/themes/fritures/fritures.json)