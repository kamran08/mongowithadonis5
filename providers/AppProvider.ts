import { ApplicationContract } from '@ioc:Adonis/Core/Application'

import Mongoose from 'mongoose'
export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public async register () {
    // Register your own bindings
  await  Mongoose.connect('mongodb://localhost/mydb')
  await  Mongoose.connection.once('open',function(){
        // console.log("hello bangladesh");
    }).on('error',function(error){
        console.log("error ello bangladesh",error);
    })
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    await Mongoose.connection.close()
    // Cleanup, since app is going down
  }
}
