# foodie api
##mongodb
###Cloud
####Mongo import:
`mongoimport --host foodie-shard-0/foodie-shard-00-00-k2paf.mongodb.net:27017,foodie-shard-00-01-k2paf.mongodb.net:27017,foodie-shard-00-02-k2paf.mongodb.net:27017 --ssl --username indioLatino --password elpelucasape --authenticationDatabase admin --db foodie --collection users --type json --file /Users/rodolfogalo/Desktop/tfg/users.json
`
###Local
####Mongo export:
`mongoexport --db foodie --collection users --out users.json