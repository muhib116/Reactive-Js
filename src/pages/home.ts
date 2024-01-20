import { createComponent } from "../framework/index.js";

export default createComponent({
    template:`
        <template>
            <div class="container mx-auto p-10">
                <h1 $show="myName" class="text-3xl font-bold">
                    Hello {{ myName }}
                </h1>
                **{{ myName }}**
                <h1 $if='true' class="text-red-500 text-4xl font-bold">
                    {{ myName }}
                </h1>
                
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
        _print(text: string): void {
            console.log(text)
        },
        mounted(){
            console.log(this, 'mounted');
        }
    }
})