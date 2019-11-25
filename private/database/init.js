db = connect("localhost:3001/meteor");

db.createCollection("sequences");

db.sequences.insert({_id:"reportSequence",sequence_value:0});
db.sequences.insert({_id:"panicButtonSequence",sequence_value:0});
db.sequences.insert({_id:"panicButtonCancellationSequence",sequence_value:0});


