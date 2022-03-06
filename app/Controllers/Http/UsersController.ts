import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mongoose, { Schema } from 'mongoose'


const User = Mongoose.model('User', new Schema({
    name: String,
    age:Number,
    email:String
  }))


  const Chat = Mongoose.model('chatings', new Schema({
    users: Array,
    users_ids: Array,
    seen_id:Number,
    data:Array,
    last_msg:String
  }))
  
export default class UsersController {
    async createUser (ctx : HttpContextContract) {
        let data = ctx.request.all()
        let ob = {
          name: data.name,
          age: data.age,
          email: data.email
        }
        if(data.name){
          let  isExist = await User.find({name:data.name})
          if(isExist && isExist.length) return "This user name already has been taken!"
        }
        const user = new User(ob)
        await user.save()
        return user
      }
      async updateUser (ctx : HttpContextContract) {
        let data = ctx.request.all()
        let ob = {
          name: data.name,
          age: data.age,
          email: data.email
        }
        
          await  User.update(
              { _id: data.id }, 
              { $set:
                ob
              }
          )
          return  User.find({_id:data.id})
      }
      async deleteUser(ctx : HttpContextContract){
        let data = ctx.request.all()
       return User.remove({_id:data.id})
      }
      async getUser(ctx : HttpContextContract){
        let data = ctx.request.all()
        let users 
        if(data.name)
           users = await User.find({name:data.name} )
            
        else users = await User.find()
        return users
      }

      async getMsg(ctx : HttpContextContract) {
        let data = ctx.request.all()
        let da = await Chat.findOne({$or:[{ users_ids: { $eq: [data.sender_id,data.reciver_id ] }} ,{ users_ids: { $eq: [data.reciver_id,data.sender_id ]} }]});
        if(da){
          return da
        }
        return "not found"
      }

      async sendMsg (ctx : HttpContextContract) {
        let data = ctx.request.all()
        if(!data.msg || data.msg==null || data.msg.trim()=='')
        return "write some text"
        // return data

        let isExist = await Chat.findOne({$or:[{ users_ids: { $eq: [data.sender_id,data.reciver_id ] }} ,{ users_ids: { $eq: [data.reciver_id,data.sender_id ]} }]});
        if(!isExist){
          let ob = {
            users:[],
            users_ids:[],
            seen_id:0,
            data:[],
            last_msg:'',
          }
          let users:any =[]
          if(data.sender_name && data.reciver_name){
              users.push(data.sender_name)
              users.push(data.reciver_name)
          }
          ob.users = users                  
          let users_ids:any =[]
          if(data.sender_name && data.reciver_name){
              users_ids.push(data.sender_id)
              users_ids.push(data.reciver_id)
          }
          ob.users_ids = users_ids
         let messages:any
          messages=[]

  
  
          ob.seen_id= data.sender_id
          ob.last_msg = data.msg
          messages.push({sender_id:data.sender_id, reciver_id:data.reciver_id,msg : data.msg})
           ob.data= messages
          // return ob
          const chattings = new Chat(ob)
          await chattings.save()
          return chattings
        }
        else{
          isExist.data.unshift({sender_id:data.sender_id, reciver_id:data.reciver_id,msg : data.msg})
          let ob ={
            data:isExist.data,
            seen_id:data.sender_id,
            last_msg:data.msg
          }

          await  Chat.update(
            { _id: isExist._id}, 
            { $set:
              ob
            }
          )

          return isExist.data

        }
       

       
       
       
      
      }
      async deleteSpecificMsg(ctx : HttpContextContract){
        let data = ctx.request.all()
        let isExist = await Chat.findOne({_id:data.id});
        if(!isExist) return "Not found!"

        if(!isExist.data || !isExist.data[data.index]) return "Not found index"
        isExist.data.splice(data.index,1)
        let ob ={
          data:isExist.data
        }
        await  Chat.update(
              { _id: data.id }, 
              { $set:
                ob
              }
          )

         return Chat.findOne({_id:data.id});
       

        

      }
}
