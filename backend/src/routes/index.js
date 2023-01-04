import taskRoute from "./task";
import userRoute from "./user";

const wrap = fn => ( ...args ) => fn( ...args ).catch( args[2] )

function main( app ) {
    app.post( '/login', wrap( userRoute.LoginByPassword ) )
    app.post( '/signup', wrap( userRoute.SignUp ) )
    app.post( '/', wrap( taskRoute.AddNewTask ) )
    app.get( '/tasks', wrap( taskRoute.GetAllTasks ) )
    //app.post( '/tasks/content/', wrap( taskRoute.GetDetailOfTasks ) )
    app.post( '/apply', wrap( taskRoute.AddReceiverToTask ) )
    app.post( '/mytasks', wrap( taskRoute.GetReceivedTasks ) )
    app.post( '/myrequests', wrap( taskRoute.GetPostedTasks ) )
    app.post( '/progress', wrap( taskRoute.AddDoneStatus ) )
    app.post( '/getRecord', wrap( userRoute.GetCount ) )
}
  
export default main