# foodie api
##mongodb
###Cloud
####Mongo import:
`mongoimport --host foodie-shard-0/foodie-shard-00-00-k2paf.mongodb.net:27017,foodie-shard-00-01-k2paf.mongodb.net:27017,foodie-shard-00-02-k2paf.mongodb.net:27017 --ssl --username ### --password ### --authenticationDatabase admin --db foodie --collection users --type json --file /route/users.json
`
###Local
####Mongo export:
`mongoexport --db foodie --collection users --out users.json
