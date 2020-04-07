import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		loading : false,
		hideNav : false,
		myInfo : {},
		article : 0,
		categeroy : [],
		tags : [],
		music : [],
		statistics : [],
		blogsList : [],
		upToken : ""
	},
	mutations:{
	  setLoading:(state,type)=>{
			state.loading = type
		}
	},
})