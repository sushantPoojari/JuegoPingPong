function init()
{
    addRequestHandler("sum", onSumRequest);
    addRequestHandler("sub", onSubRequest);

    
    // addRequestHandler("createRoom", onCreateRoomOrJoinRoom);

    trace("Simple JS Example inited");
}
 
function destroy()
{
    trace("Simple JS Example destroyed");
}
 
function onSumRequest(params, sender) 
{
    trace("Simple JS Example onSumRequest");

    var a = params.getInt("a");
    var b = params.getInt("b");
 
    var response = new SFSObject();
    response.putInt("res", a + b);
 
    send("sum", response, [sender]);
}

 
function onSubRequest(params, sender) 
{
    trace("Simple JS Example onSubRequest");

    var a = params.getInt("a");
    var b = params.getInt("b");
 
    var response = new SFSObject();
    response.putInt("res", a - b);
 
    send("sub", response, [sender]);
}

// function onCreateRoomOrJoinRoom(params, sender)
// {
//     trace("Simple JS Example onCreateRoomOrJoinRoom");

//     //Collection<User> List<Room>
//     var userList = getParentZone().getUserList();
//     var roomList =  getParentZone().getRoomList();

//     trace("Simple JS Example onCreateRoomOrJoinRoom", userList.length, " ", roomList.length);

//     for (var r in roomList) {
//         if(r.userCount<2)
//         {
//             var response = new SFSObject();
//             response.putInt("res", a + b);
//             send("createRoom", response, [sender]);

//             return; 
//         }
//     }


//     var a = params.getInt("a");
//     var b = params.getInt("b");
 
//     var response = new SFSObject();
//     response.putInt("res", a + b);
 
//     send("sum", response, [sender]);

// }