<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center" id="villageResources">
        <ul class="list-group list-group-horizontal flex-row">
          <li class="list-group-item">
              <img style="width: 1.2rem;height: 0.9rem;" src="/images/wood.gif">
              <span id="currentWood">{{ parseInt(villageResources[0]) }}</span>/<span id="maxWood">{{ villageMaxResources[0] }}</span>
          </li>
          <li class="list-group-item">
              <img style="width: 1.2rem;height: 0.9rem;" src="/images/clay.gif">
              <span id="currentClay">{{ parseInt(villageResources[1]) }}</span>/<span id="maxClay">{{ villageMaxResources[1] }}</span>
          </li>
          <li class="list-group-item">
              <img style="width: 1.2rem;height: 0.9rem;" src="/images/iron.gif">
              <span id="currentIron">{{ parseInt(villageResources[2]) }}</span>/<span id="maxIron">{{ villageMaxResources[2] }}</span>
          </li>
          <li class="list-group-item">
              <img style="width: 1.2rem;height: 0.9rem;" src="/images/crop.gif">
              <span id="currentCrop">{{ parseInt(villageResources[3]) }}</span>/<span id="maxCrop">{{ villageMaxResources[3] }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="container mt-5">
      <div class="justify-content-center text-center">
          <h1> Send Troops to VillageName2 1/1</h1><br />
          <br />
          <table class="table table-bordered w-100 m-auto" v-if="!isMobile()">
              <thead >
                  <tr>
                    <th scope="col">clubswinger</th>
                    <th scope="col">Spearman</th>
                    <th scope="col">Axeman</th>
                    <th scope="col">Scout</th>
                    <th scope="col">Paladin</th>
                    <th scope="col">Teutonic Knight</th>
                    <th scope="col">Ram</th>
                    <th scope="col">Catapult</th>
                    <th scope="col">Chief</th>
                    <th scope="col">Settler</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[0]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[1]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[2]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[3]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[4]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[5]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[6]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[7]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[8]}})</strong></a>
                          </div>
                      </td>
                      <td class="align-middle">
                          <div class="input-group input-group-sm align-middle">
                              <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                              <a href="#" style="color:green"><strong>({{villageOwnTroops[9]}})</strong></a>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div v-else>
            <table class="table table-bordered w-100 m-auto">
                <thead>
                    <tr>
                      <th scope="col">clubswinger</th>
                      <th scope="col">Spearman</th>
                      <th scope="col">Axeman</th>
                      <th scope="col">Scout</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[0]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[1]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[2]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[3]}})</strong></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered w-100 m-auto">
                <thead>
                    <tr>
                      <th scope="col">Paladin</th>
                      <th scope="col">Teutonic Knight</th>
                      <th scope="col">Ram</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[4]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[5]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[6]}})</strong></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered w-100 m-auto">
                <thead>
                    <tr>
                      <th scope="col">Catapult</th>
                      <th scope="col">Chief</th>
                      <th scope="col">Settler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[7]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[8]}})</strong></a>
                            </div>
                        </td>
                        <td class="align-middle">
                            <div class="input-group input-group-sm align-middle">
                                <input type="number" class="form-control mr-2" min="0" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                                <a href="#" style="color:green"><strong>({{villageOwnTroops[9]}})</strong></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="dropdown mt-3 w-100">
              <button class="btn btn-danger dropdown-toggle w-50" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Full Attack
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <!--<a class="dropdown-item" id="ddItem1" href="#">Reinforcement</a>-->
                  <a class="dropdown-item" id="ddItem2" href="#">Full Attack</a>
                  <!--<a class="dropdown-item" id="ddItem3" href="#">Raid Attack</a>-->
              </div>                    
              <div class="btn-group w-50" role="group" aria-label="Train">
                  <button type="button" class="btn btn-success w-75 m-auto" id="sendType" @click="sendTroops()">Full Attack</button>
              </div>
          </div>
          <h5 class="mt-4 text-danger" id="errorMessage">
          </h5>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      villageResources : [],
      maxResources : [0,0,0,0],
      villageOwnTroops : []
    };
  },

  created() {
    this.fetchVillageResources();
    this.fetchVillageMaxResources();
    this.fetchVillageOwnTroops();
    console.log(this.isMobile());
  },

  methods: {
    async sendTroops(){

      let idVillageFrom = 1;
      let idVillageTo = 2;

      let sendTroopsData = {
        "sendType": "full",
        "idVillageFrom": idVillageFrom,
        "idVillageTo": idVillageTo,
        "troopTribe": "teuton",
        "troop1num": 0,
        "troop2num": 0,
        "troop3num": 0,
        "troop4num": 0,
        "troop5num": 0,
        "troop6num": 0,
        "troop7num": 0,
        "troop8num": 0,
        "troop9num": 0,
        "troop10num": 0
      }

      let inputs = document.querySelectorAll("input[type=number]");

      for(let i = 1; i < 11; i++){
        if(inputs[i-1].value == "" || inputs[i-1].value < 0){ inputs[i-1].value = 0 }
        sendTroopsData["troop"+i+"num"] = inputs[i-1].value;
      }

      console.log(sendTroopsData);


      let sendTroopsResponse = await fetch('http://localhost:8080/api/sendTroops', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendTroopsData),
      });

      let sendTroopsDataJson = await sendTroopsResponse.json();

      console.log(sendTroopsDataJson);

      if(sendTroopsDataJson.message == "New sendTroops created"){
        this.$router.push({ name: 'resources' });
      }
      else{
        document.getElementById("errorMessage").innerText = sendTroopsDataJson.message;
      }
    },
    fetchVillageResources(){
      this.villageResources = this.$store.getters.getVillageResources;

      this.$store.dispatch('fetchVillageResources')
      .then( () => {
        this.villageResources = this.$store.getters.getVillageResources;
      });
    },
    fetchVillageMaxResources(){
      this.villageMaxResources = this.$store.getters.getVillageMaxResources;

      this.$store.dispatch('fetchVillageMaxResources')
      .then( () => {
        this.villageMaxResources = this.$store.getters.getVillageMaxResources;
      });
    },
    fetchVillageOwnTroops(){
      this.villageOwnTroops = this.$store.getters.getVillageOwnTroops;

      this.$store.dispatch('fetchVillageOwnTroops')
      .then( () => {
        this.villageOwnTroops = this.$store.getters.getVillageOwnTroops;
      });
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>


<style>

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;

}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>