<template>
  <div class="card mt-3 pa-5">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat Group</h3>
              <hr>
          </div>
          <div class="card-body">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg }}: </span>{{ msg }}</p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import Sockette from 'sockette';

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            ws: new Sockette('wss://713ewpyawl.execute-api.eu-west-2.amazonaws.com/dev',{
                timeout: 5e3,
                maxAttempts: 10,
                onopen: e => console.log('Connected!', e),
                onmessage: e => this.messages.push(e.data),
                onreconnect: e => console.log('Reconnecting...', e),
                onmaximum: e => console.log('Stop Attempting!', e),
                onclose: e => console.log('Closed!', e),
                onerror: e => console.log('Error:', e)
            })
        }
    },
    methods: {
        sendMessage(){
            this.ws.json({action:"sendMessage", data: "Hello"});
        }
    },
    mounted() {

    }
}
</script>

<style>

</style>