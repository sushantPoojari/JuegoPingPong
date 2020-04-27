function init()
{
    addRequestHandler("sum", onSumRequest);
    addRequestHandler("sub", onSubRequest);
    addRequestHandler("createroom", onCreateRoomOrJoinRoom);
    addRequestHandler("FindRoom", onFindRoom);

    getApi().addEventListener(SFSEvent.ROOM_ADD, onRoomAdded)
    getApi().addEventListener(SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError)
    getApi().addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError);
    getApi().addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin);

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

function onCreateRoomOrJoinRoom(params, sender)
{
    trace("Simple JS Example onCreateRoomOrJoinRoom");

    //Collection<User> List<Room>
    var userList = getParentZone().getUserList();
    var roomList =  getParentZone().getRoomList();

    var cfg = new CreateRoomSettings();
 
    cfg.setName("MyNewGame");
    cfg.setGame(true);
    
    cfg.setMaxUsers(10);
    cfg.setMaxSpectators(5);
    
    cfg.setDynamic(true);
    
    try
    {
        var myNewRoom = getApi().createRoom(getParentZone(), cfg, null);
        send("createRoom", myNewRoom, [sender]);
    }
    catch (SFSCreateRoomException)
    {
        trace("Simple JS Example SFSCreateRoomException", userList.length, " ", roomList.length, " ", SFSCreateRoomException);
        // ... handle exception
    }

    trace("Simple JS Example onCreateRoomOrJoinRoom", userList.length, " ", roomList.length);

    // for (var r in roomList) {
    //     if(r.userCount<2)
    //     {
    //         var response = new SFSObject();
    //         response.putInt("res", a + b);
    //         send("createRoom", response, [sender]);

    //         return; 
    //     }
    // }


    // var a = params.getInt("a");
    // var b = params.getInt("b");
 
    // var response = new SFSObject();
    // response.putInt("res", a + b);
 
    // send("createroom", response, [sender]);

}

function onFindRoom(event, sender) {
   

    var userList = getParentZone().getUserList();
    var roomList =  getParentZone().getRoomList();


    for (var room in roomList) {
        if(room.userCount<2)
        {
            var response = new SFSObject();
            response.putSFSObject("oldRoom", room);
            getApi().JoinRoomRequest(sender, room);
            send("FindRoom", response, [sender]);
            return; 
        }
    }
    var cfg = new CreateRoomSettings();

    var roomName = "PingPongRoom" + (roomList.length+1);
  
    cfg.setName(roomName);
    cfg.setGame(true);
    cfg.setMaxUsers(2);
    cfg.setMaxSpectators(5);
    cfg.setDynamic(true);

    // var room = getApi().createRoom(getParentZone(), cfg, null, false, null, true, false);
    try
    {
        var room = getApi().createRoom(getParentZone(), cfg, null, false, null, true, false);
        trace("Simple JS Example FindRoom Created", userList.length, " ", roomList.length);
        var response = new SFSObject();
        response.putSFSObject("newRoom", room);
        getApi().JoinRoomRequest(sender, room);
        send("FindRoom", response, [sender]);
    }
    catch (SFSCreateRoomException)
    {
        trace("Simple JS Example FindRoom SFSCreateRoomException", userList.length, " ", roomList.length, " ", SFSCreateRoomException);
        // ... handle exception
    }
    
    // var myNewRoom = getApi().createRoom(getParentZone(), cfg, null);
 }

function onRoomAdded(evt)
{
    trace("Simple JS Example A new Room was added: " + evt.params.room )
}
 
function onRoomCreationError(evt)
{
    trace("Simple JS Example An error occurred while attempting to create the Room: " + evt.params.errorMessage)
}