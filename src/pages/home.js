import { createComponent } from "../framework/index.js";

export default createComponent({
    template:`
        <template>
            <div class="container mx-auto p-10">
                
                <h1 $show="myName" class="text-3xl font-bold">
                    {{ commission = 50 }}
                    total: {{ price + commission + myName }}-
                    {{ getName(getDes()) }}
                </h1>
                <!--{{ price + commission + 50 }}
                <h1 $if='true' class="text-red-500 text-4xl font-bold">
                    {{ myName + ' ansary }}
                </h1>
                -->
                
                <button 
                    class="px-4 py-2 rounded shadow border border-red-500 bg-red-500 text-white hover:text-red-500 hover:bg-white"
                    v-else $click="_print('Hello world')"
                >
                    Click here
                </button>

                <p $for="(item, index) in list">
                </p>
            </div>
        </template>

        <style scoped>
            .myHeading{
                font-weight: bold;
                padding: 16px;
                font-size: 24px;
            }
        </style>
    `,

    setupScript: {
        myName: 'Muhibbullah',
        list: [
            'muhibbullah',
            'nasrullah',
            'mahsinullah'
        ],
        price: 100,
        commission: 10,
        getDes(){
            return 'mrs'
        },
        _print(text) {
            console.log(text)
        },
        getName(pref){
            console.log('name printed...');
            return pref+' Hashi akter'
        },
        mounted(){
            console.log(this, 'mounted');
        }
    }
})