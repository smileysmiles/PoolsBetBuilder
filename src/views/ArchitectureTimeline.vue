<template>
<v-container>
  <v-timeline align-top>
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="title">{{item.header}}</v-card-title>
        <v-card-text class="white text--primary">
          <p v-html="item.text"></p>
          <!-- <v-btn
            :color="item.color"
            class="mx-0"
            outline
          >
            Button
          </v-btn> -->
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</v-container>
</template>
<script>
  export default {
    name:"architecturetimeline",
    data: () => ({
      items: [
        {
          color: 'green lighten-2',
          icon: 'mdi-check',
          header: 'Define Architectural Principles',
          text: `<p>1. Concept - Pools offering that can be easily integrated to 3rd party sites.</p>
          <p>2. Utilise AWS for low cost high cadence route to market.</p>
          <p>3. MVP 1 delivery of IFrame based solution. Later looking at component based and nativescript OS and Droid versions </p>
          <p>4. Account agnostic pools builder for MVP 1 may cross to user identification later and understand posibilities around customer later again</p>
          <p>5. Use of data streaming initially Kinesis for low cost technology POC</p>
          <p>6. B2C, B2B & B2B2C potential</p>
          <p>7. Agility. Ability to leverage new services simply and cost effectively</p>
          <p>8. PoC ability to create components using Serverless framewaork</p>`
        },
        {
          color: 'green lighten-2',
          icon: 'mdi-check',
          header: 'Action API',
          text: `<p>1. PoC ability to place bets using the harness</p>
          <p>2. PoC Sync to Async integration using AWS services for Bet Placement</p>
          <p>3. PoC API gateway for direct integration to SNS/SQS to queue sync request for processing in timely manner or timeout</p>
          <p>4. PoC shaping Bet selection data and Bet placement data minus customer reference</p>
          <p>5. PoC Abstraction/caching of Pay Bet using TSN and cust references to prevent Gateway loading</p>
          <p>6. PoC ability to create components using Serverless framewaork</p>`
        },
        {
          color: 'green lighten-2',
          icon: 'mdi-check',
          header: 'Data Stream PoC',
          text: `<p>1. PoC streaming data from test harness gateway integration to kinesis</p>
          <p>2. PoC shaping json data from kinesis stream to format for UI</p>
          <p>3. PoC multiple shaping methods to prove fan out concept</p>
          <p>4. PoC Shaping Update messages from gateway.</p>
          <p>5. PoC Shaping update messages and mutating UI data</p>
          <p>6. PoC Shaping Racing Post Raecards, Runners from Racing Post API.</p>
          <p>7. PoC Shaping racing post data and mutating UI data</p>
          <p>8. PoC ability to create components using Serverless framewaork</p>`
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-check',
          header: 'Data Store',
          text: `<p>1. PoC streaming data from test harness gateway integration to kinesis</p>
          <p>2. PoC shaping json data from kinesis stream to format for UI</p>
          <p>3. PoC multiple shaping methods to prove fan out concept</p>
          <p>4. PoC Shaping Update messages from gateway.</p>
          <p>5. PoC Shaping update messages and mutating UI data</p>
          <p>6. PoC Shaping Racing Post Raecards, Runners from Racing Post API.</p>
          <p>7. PoC Shaping racing post data and mutating UI data</p>
          <p>8. PoC ability to create components using Serverless framewaork</p>`
        },
        {
          color: 'orange',
          icon: 'mdi-exclamation',
          header: 'Data API',
          text: `<p>1. PoC exposing data to clients using API Gateway direct integration to DynamoDB</p>
          <p>2. PoC mapping templates best practice</p>
          <p>3. PoC performance of API GW direct integration</p>
          <p>4. PoC agility of API GW direct integration.</p>
          <p class="red--text">5. PoC agility of using other data technologies to access data</p>
          <p>6. PoC ability to create API using Serverless framewaork</p>
          <p class="red--text">7. Create serverless yml Api > Dynamo IAM role</p>`
        },
        {
          color: 'green',
          icon: 'mdi-check',
          header: 'MVP1 UI PoC',
          text: `<p>1. PoC using reactive framework to build simple UI to service a few bet types</p>`
        },
        {
          color: 'green',
          icon: 'mdi-check',
          header: 'Stakeholder feedback',
          text: `Progress catchup with Phil`
        },        
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'Data Processing',
          text: `<p>1. Mutate data further by Meeting Pools. Prevent heavy map operations in UI</p>
          <p>2. Mutate data further by Race Pools. Prevent heavy map operations in UI</p>
          <p>3. Add Racing post runner form to racing post event stream.</p>
          <p>4. Identify further mutation options to reduce heavy array operations in UI</p>`
        },
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'Data API',
          text: `<p>1. Refactor API removing unrequired end-points</p>
          <p>2. Integrate endpoints for new map reduce around pools if required!!</p>
          <p>3. Create API 3 definition for serverless from deployment</p>`
        },
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'Odds King',
          text: `<p>1. Exchange technical docs</p>
          <p>2. Initial meeting</p>
          <p>3. Help OK Understand integration options</p>
          <p>4. Help OK integrate within architectural guidlines and principles. Changes cannot impact the key principles.</p>
          `
        },
        {
          color: 'blue',
          icon: 'mdi-exclamation',
          header: 'Asian App Roadmap',
          text: `DEFINE`
        },
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'Asian Integration',
          text: `<p>1. PAM - Build v Buy v Buid & Buy (small service integration, buy local = less commission)</p>
          <p>2. Define PAM requirements MVP1 ++</p>
          <p>3. GDPR, Security, Compliance</p>
          <p>4. Define option risks</p>
          <p>5. Define risks v benefits</p>
          <p>6. Define roadmap for September delivery</p>
          <p>7. Translations required?</p>
          `
        },
        {
          color: 'blue',
          icon: 'mdi-exclamation',
          header: 'Alizeti integration Roadmap',
          text: `DEFINE`
        },
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'Alizeti App',
          text: `<p>1. PAM - Build v Buy v Buid & Buy (small service integration)</p>
          <p>2. Understand roadmap (Web/Mobile, Native, Placepot App)</p>
          <p>3. Understand best integration points</p>
          <p>4. Understand operating model
          `
        },
        {
          color: 'red',
          icon: 'mdi-exclamation',
          header: 'PAM / wallet',
          text: `<p>1. PAM - Build v Buy v Buid & Buy (small service integration)</p>
          <p>2. SAAS offerings around individual services(payments etc)</p>
          <p>3. Understand benefits of owning core</p>
          <p>4. Understand risks and cons of owning core</p>
          <p>5. Define risks v benefits</p>`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'AI bet selection',
          text: `DEFINE`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'User Identification',
          text: `DEFINE`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'Use Profiling',
          text: `DEFINE`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'Customer Integration',
          text: `DEFINE`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'OMICHANNEL',
          text: `AT THE RACES / OMNI Channel (Digital/Retail)`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'Pause / Play Back',
          text: `Busy? Pause updates then playback later`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'Media integration',
          text: `Watch Live / Radio etc`
        },       
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'Data Warehouse',
          text: `Map reduce from Event Streaming to DW`
        },
        {
          color: 'grey darken-3',
          icon: 'mdi-lightbulb-on-outline',
          header: 'SEO maximisation',
          text: `Investigate options determine what and how`
        },
      ]
    })
  }
</script>