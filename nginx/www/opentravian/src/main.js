import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';


import Resources from './components/Resources.vue';
import ExampleComponent from './components/ExampleComponent.vue';
import Login from './components/Login.vue';
import ResourceField from './components/ResourceField.vue';
import Village from './components/Village.vue';
import VillageBuilding from './components/VillageBuilding.vue';
import SendTroops from './components/SendTroops.vue';
import Map from './components/Map.vue';
import App from './components/app.vue';

//import App from './App.vue'

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('login', require('./components/Login.vue').default);
Vue.component('resources', require('./components/Resources.vue').default);
Vue.component('resourceField', require('./components/ResourceField.vue').default);
Vue.component('village', require('./components/Village.vue').default);
Vue.component('app', require('./components/app.vue').default);

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes: [
      {path: '/home', name: 'home', component: ExampleComponent},
      {path: '/', redirect: '/resources'},
      {path: '/login', name: 'login', component: Login},
      {path: '/resources', name: 'resources', component: Resources},
      {path: '/resourceField/:rfid', name: 'resourceField', component: ResourceField},
      {path: '/village', name: 'village', component: Village},
      {path: '/villageBuilding/:vbid', name: 'villageBuilding', component: VillageBuilding},
      {path: '/sendTroops/:vid', name: 'sendTroops', component: SendTroops},
      {path: '/map', name: 'map', component: Map},
  ],
});

const store = new Vuex.Store({
  state: {
    count: 0,
    villageResources: [0,0,0,0],
    villageMaxResources : [0,0,0,0],
    villageResFieldLevels : [],
    villageResFieldTypes : [],
    villageResFieldColors : ["","Green","Orange","Silver","","Silver","Gold","Gold","Green","Orange","Gold","White","Gold","Orange","Green","Gold","Gold","Silver","","Silver","Orange","Green"],
    villageProduction : [0,0,0,0],
    villageResFieldUpgrades : [],
    villageOwnTroops : [],
    villageReinforcements : [],
    villageIncomingAttacks : [],
    villageIncomingReinforcements : [],
    villageOutgoingAttacks : [],
    villageOutgoingReinforcements : [],
    villageBarracksProduction : [],
  },
  mutations: {
    increment (state, payload) {
      state.count += payload;
    },
    setVillageResources(state, resources){
      state.villageResources = resources;
    },
    setVillageMaxResources(state, villageMaxResources){
      state.villageMaxResources = villageMaxResources;
    },
    setVillageResFieldLevels(state, villageResFieldLevels){
      state.villageResFieldLevels = villageResFieldLevels;
    },
    setVillageResFieldTypes(state, villageResFieldTypes){
      state.villageResFieldTypes = villageResFieldTypes;
    },
    setVillageResFieldColors(state, villageResFieldColors){
      state.villageResFieldColors = villageResFieldColors;
    },
    setVillageProduction(state, villageProduction){
      state.villageProduction = villageProduction;
    },
    setVillageResFieldUpgrades(state, villageResFieldUpgrades){
      state.villageResFieldUpgrades = villageResFieldUpgrades;
    },
    setVillageOwnTroops(state, villageOwnTroops){
      state.villageOwnTroops = villageOwnTroops;
    },
    setVillageReinforcements(state, villageReinforcements){
      state.villageReinforcements = villageReinforcements;
    },
    setVillageOutgoingAttacks(state, villageOutgoingAttacks){
      state.villageOutgoingAttacks = villageOutgoingAttacks;
    },
    setVillageOutgoingReinforcements(state, villageOutgoingReinforcements){
      state.villageOutgoingReinforcements = villageOutgoingReinforcements;
    },
    setVillageIncomingAttacks(state, villageIncomingAttacks){
      state.villageIncomingAttacks = villageIncomingAttacks;
    },
    setVillageIncomingReinforcements(state, villageIncomingReinforcements){
      state.villageIncomingReinforcements = villageIncomingReinforcements;
    },
    setVillageBarracksProduction(state, villageBarracksProduction){
      state.villageBarracksProduction = villageBarracksProduction;
    },
  },
  actions: {
      increment (context,payload) {
          context.commit('increment',payload)
      },
      async fetchVillageResources(context){
          let villageRes = await(await(await fetch('http://localhost:8080/api/villageResources/1')).json()).data;
          let villageMaxRes = await(await(await fetch('http://localhost:8080/api/villageMaxResources/1')).json()).data;
          let villageProd = await(await(await fetch('http://localhost:8080/api/villageProductions/1')).json()).data;          

          let currentTime = Math.round(+new Date()/1000);
          let timeDiff = (currentTime - villageRes.lastUpdate) / 3600;
          
          let newWood = villageRes.currentWood + (timeDiff * villageProd.productionWood);
          let newClay = villageRes.currentClay + (timeDiff * villageProd.productionClay);
          let newIron = villageRes.currentIron + (timeDiff * villageProd.productionIron);
          let newCrop = villageRes.currentCrop + (timeDiff * villageProd.productionCrop);

          if(villageRes.currentWood == newWood && villageRes.currentClay == newClay && 
          villageRes.currentIron == newIron && villageRes.currentCrop == newCrop){
              return;
          }

          if (newWood >= villageMaxRes.maxWood){ newWood = villageMaxRes.maxWood }
          if (newClay >= villageMaxRes.maxClay){ newClay = villageMaxRes.maxClay }
          if (newIron >= villageMaxRes.maxIron){ newIron = villageMaxRes.maxIron }
          if (newCrop >= villageMaxRes.maxCrop){ newCrop = villageMaxRes.maxCrop }

          let villageResources = [newWood,newClay,newIron,newCrop];
          context.commit('setVillageResources', villageResources);

          let villageResourcesUpdate = {
            "idVillage": 1,
            "currentWood": newWood,
            "currentClay": newClay,
            "currentIron": newIron, 
            "currentCrop": newCrop,
            "lastUpdate": currentTime 
          };

          fetch('http://localhost:8080/api/villageResources/1', {
            method: 'PATCH', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(villageResourcesUpdate),
          });
      },
      async fetchVillageMaxResources(context){
          await fetch('http://localhost:8080/api/villageMaxResources/1')
          .then(res => res.json())
          .then(res => {
              let villageMaxResources = [res.data.maxWood,res.data.maxClay,res.data.maxIron,res.data.maxCrop];
              context.commit('setVillageMaxResources', villageMaxResources);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageResFieldLevels(context){
          await fetch('http://localhost:8080/api/villageFieldLevels/1')
          .then(res => res.json())
          .then(res => {
              let villageResFieldLevels = ["",res.data.resField1Level,res.data.resField2Level,res.data.resField3Level,"",
              res.data.resField4Level,res.data.resField5Level,res.data.resField6Level,res.data.resField7Level,
              res.data.resField8Level,res.data.resField9Level,"Village",res.data.resField10Level,res.data.resField11Level,
              res.data.resField12Level,res.data.resField13Level,res.data.resField14Level,res.data.resField15Level,
              "",res.data.resField16Level,res.data.resField17Level,res.data.resField18Level];

              context.commit('setVillageResFieldLevels', villageResFieldLevels);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageResFieldTypes(context){
          await fetch('http://localhost:8080/api/villageFieldTypes/1')
          .then(res => res.json())
          .then(res => {
              let villageResFieldTypes = ["",res.data.resField1Type,res.data.resField2Type,res.data.resField3Type,"",
              res.data.resField4Type,res.data.resField5Type,res.data.resField6Type,res.data.resField7Type,
              res.data.resField8Type,res.data.resField9Type,"village",res.data.resField10Type,res.data.resField11Type,
              res.data.resField12Type,res.data.resField13Type,res.data.resField14Type,res.data.resField15Type,
              "",res.data.resField16Type,res.data.resField17Type,res.data.resField18Type];
              
              let villageResFieldColors = villageResFieldTypes.map(type => {
                  if(type == "wood"){ return "Green"}
                  else if(type == "clay"){ return "Orange"}
                  else if(type == "iron"){ return "Silver"}
                  else if(type == "crop"){ return "Gold"}
                  else if(type == "village"){ return "White"}
                  else {return ""}
              });

              context.commit('setVillageResFieldTypes', villageResFieldTypes);
              context.commit('setVillageResFieldColors', villageResFieldColors);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageProduction(context){
          await fetch('http://localhost:8080/api/villageProductions/1')
          .then(res => res.json())
          .then(res => {
              let villageProduction = [res.data.productionWood,res.data.productionClay,res.data.productionIron,res.data.productionCrop];
              context.commit('setVillageProduction', villageProduction);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageResFieldUpgrades(context){
          await fetch('http://localhost:8080/api/resFieldUpgrades/1')
          .then(res => res.json())
          .then(res => {
              let villageResFieldUpgrades = res.data;
              context.commit('setVillageResFieldUpgrades', villageResFieldUpgrades);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageOwnTroops(context){
          await fetch('http://localhost:8080/api/villageOwnTroops/1')
          .then(res => res.json())
          .then(res => {        
              let villageOwnTroops = [res.data.troop1,res.data.troop2,res.data.troop3,res.data.troop4,res.data.troop5,
                res.data.troop6,res.data.troop7,res.data.troop8,res.data.troop9,res.data.troop10];
              context.commit('setVillageOwnTroops', villageOwnTroops);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageReinforcements(context){
          await fetch('http://localhost:8080/api/villageReinforcements/1')
          .then(res => res.json())
          .then(res => {
            let villageReinforcements = res.data;
            context.commit('setVillageReinforcements', villageReinforcements);
          })
          .catch(err => console.log(err));
      },
      async fetchVillageTroopMovements(context){
          await fetch('http://localhost:8080/api/sendTroops/1')
          .then(res => res.json())
          .then(res => {
              
              let villageOutgoingAttacks = [];
              let villageOutgoingReinforcements = [];
              let villageIncomingAttacks = [];
              let villageIncomingReinforcements = [];

              for(let troopMovement of res.data){
                  if(troopMovement.idVillageFrom == 1){
                      if(troopMovement.sendType == "full" || troopMovement.sendType == "raid"){
                          villageOutgoingAttacks.push(troopMovement);
                      }
                      else if(troopMovement.sendType == "reinforcement" || troopMovement.sendType == "return"){
                          villageOutgoingReinforcements.push(troopMovement);
                      }
                  }
                  else if(troopMovement.idVillageTo == 1){
                      if(troopMovement.sendType == "full" || troopMovement.sendType == "raid"){
                          villageIncomingAttacks.push(troopMovement);
                      }
                      else if(troopMovement.sendType == "reinforcement" || troopMovement.sendType == "return"){
                          villageIncomingReinforcements.push(troopMovement);
                      }
                  }
              }

              context.commit('setVillageOutgoingAttacks', villageOutgoingAttacks);
              context.commit('setVillageOutgoingReinforcements', villageOutgoingReinforcements);
              context.commit('setVillageIncomingAttacks', villageIncomingAttacks);
              context.commit('setVillageIncomingReinforcements', villageIncomingReinforcements);    
          })
          .catch(err => console.log(err));
      },
      async fetchVillageBarracksProduction(context){
          await fetch('http://localhost:8080/api/barracksProductions/1')
          .then(res => res.json())
          .then(res => {
            let villageBarracksProduction = res.data;
            context.commit('setVillageBarracksProduction', villageBarracksProduction);
          })
          .catch(err => console.log(err));
      },
      
  },
  getters: {
      incrementGetter: state => {
          return state.count;
      },
      getVillageResources: state => {
          return state.villageResources;
      },
      getVillageMaxResources: state => {
          return state.villageMaxResources;
      },
      getVillageResFieldLevels: state => {
          return state.villageResFieldLevels;
      },
      getVillageResFieldTypes: state => {
          return state.villageResFieldTypes;
      },
      getVillageResFieldColors: state => {
          return state.villageResFieldColors;
      },
      getVillageProduction: state => {
          return state.villageProduction;
      },
      getVillageResFieldUpgrades: state => {
          return state.villageResFieldUpgrades;
      },
      getVillageOwnTroops: state => {
          return state.villageOwnTroops;
      },
      getVillageReinforcements: state => {
          return state.villageReinforcements;
      },
      getVillageOutgoingAttacks: state => {
          return state.villageOutgoingAttacks;
      },
      getVillageOutgoingReinforcements: state => {
          return state.villageOutgoingReinforcements;
      },
      getVillageIncomingAttacks: state => {
          return state.villageIncomingAttacks;
      },
      getVillageIncomingReinforcements: state => {
          return state.villageIncomingReinforcements;
      },
      getVillageBarracksProduction: state => {
          return state.villageBarracksProduction;
      },
  }
})


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  render: h => h(App)
});