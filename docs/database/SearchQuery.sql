select memory.id , memory.place_id , place.placeName, memory.author , memory.image , 
memory.content , memory.tags ,memory.mem_date , memory.active 
from place inner join memory on place.place_id = memory.place_id where tags like '%bogazici%'

