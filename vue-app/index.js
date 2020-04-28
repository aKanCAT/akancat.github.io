const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const capi_url = 'https://tw.rter.info/capi.php';



const URL = 'http://tw.rter.info/json.php?t=currency&q=check&iso=JPY';

var obj = {
    foo: 'bar',
    url: URL,
    fetchMsg: '',
    list: [{
            title: '1000 哩程',
            items: [{
                    name: '電線桿',
                    list: [
                        "imgs/FtrTelephonepole_Remake_0_0.png",
                        "imgs/FtrTelephonepole_Remake_1_0.png",
                    ]
                },
                {
                    name: '流動廁所',
                    list: [
                        "imgs/FtrWCPortable_Remake_0_0.png",
                        "imgs/FtrWCPortable_Remake_1_0.png",
                        "imgs/FtrWCPortable_Remake_2_0.png",
                        "imgs/FtrWCPortable_Remake_3_0.png",
                        "imgs/FtrWCPortable_Remake_4_0.png"
                    ]
                },
                {
                    name: '告示牌',
                    list: [
                        "imgs/FtrSignConstruction_Remake_0_0.png",
                        "imgs/FtrSignConstruction_Remake_1_0.png",
                        "imgs/FtrSignConstruction_Remake_2_0.png",
                        "imgs/FtrSignConstruction_Remake_3_0.png",
                        "imgs/FtrSignConstruction_Remake_4_0.png"
                    ]
                }
            ]
        },
        {
            title: '2000 哩程',
            items: [{
                    name: '販賣機',
                    list: [
                        "imgs/FtrFoodmachine_Remake_0_0.png",
                        "imgs/FtrFoodmachine_Remake_1_0.png",
                        "imgs/FtrFoodmachine_Remake_2_0.png",
                        "imgs/FtrFoodmachine_Remake_3_0.png",
                    ]
                },
                {
                    name: '望遠鏡',
                    list: [
                        "imgs/FtrTelescopeSightseeing_Remake_0_0.png",
                        "imgs/FtrTelescopeSightseeing_Remake_1_0.png",
                        "imgs/FtrTelescopeSightseeing_Remake_2_0.png",
                        "imgs/FtrTelescopeSightseeing_Remake_3_0.png",
                        "imgs/FtrTelescopeSightseeing_Remake_4_0.png"
                    ]
                }
            ]
        },
        {
            title: '2400 哩程',
            items: [{
                    name: '廣場時鐘',
                    list: [
                        "imgs/FtrParkclock_Remake_0_0.png",
                        "imgs/FtrParkclock_Remake_1_0.png",
                        "imgs/FtrParkclock_Remake_2_0.png",
                        "imgs/FtrParkclock_Remake_3_0.png",
                    ]
                },
                {
                    name: '電話亭',
                    list: [
                        "imgs/FtrTelephonebox_Remake_0_0.png",
                        "imgs/FtrTelephonebox_Remake_1_0.png",
                        "imgs/FtrTelephonebox_Remake_2_0.png",
                        "imgs/FtrTelephonebox_Remake_3_0.png",
                        "imgs/FtrTelephonebox_Remake_4_0.png",
                        "imgs/FtrTelephonebox_Remake_5_0.png",
                        "imgs/FtrTelephonebox_Remake_6_0.png",
                        "imgs/FtrTelephonebox_Remake_7_0.png"
                    ]
                }
            ]
        }
    ]
}

function jsonCallback(json) {
    console.log('jsonCallback');
    $.each(json, function(index, value) {
        alert(index + " " + value);
    });
}

let vm = new Vue({
    el: '#app',
    data: obj,

    created() {
        console.log('created');

        // const hostname = "http://www.google.com.tw";
        // fetch(`${hostname}`, {
        //         credentials: 'include'
        //         // headers: {
        //         //     'X-Access-Token': 'dontbeserious'
        //         // }
        //     })
        //     .then(function(response) {
        //         console.log(response);
        //     }).then(function(value) {
        //         console.log('value: ' + value);
        //     })

        // fetch(url, {
        //         headers: {
        //             'X-Access-Token': 'dontbeserious'
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(log);



        // /** fetch api url by cors-anywhere */
        // //axios.get(`${cors}${obj.url}`)
        // axios.get(url)
        //     .then((response) => {
        //             console.log(response.status);
        //             console.log(response.data);
        //         },
        //         (error) => {
        //             console.log(error);
        //         }
        //     );
    },
    mounted() {
        // axios
        //     .get()
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) { // 请求失败处理
        //         console.log(error);
        //     });
    },
    computed: {

    },
    methods: {
        getURL: function() {
            return URL + '&_=' + moment.utc().valueOf();
        },
        func1: function() {
            //this.url = URL + '_=' + moment.utc().valueOf();

            let vm = this;

            $.ajax({
                type: "get",
                url: 'json.php',
                success: function(res) {
                    console.log('success');
                    //console.log(res);
                    let json = JSON.parse(res);
                    vm.list = json.data;
                    console.log(json.data);
                },
                error: function(res) {
                    console.log('error');
                    console.log(res);
                }
            });
        },
        func2: function() {
            //this.url = URL + '_=' + moment.utc().valueOf();

            let url = "http://rate.bot.com.tw/xrt/fltxt/0/day";

            this.fetchMsg = '同步中';

            let vm = this;

            fetch(`${cors}${url}`, {})
                .then((response) => {
                    vm.fetchMsg = '同步成功';
                    console.log(response);
                })
                .then((jsonData) => {

                })
                .catch((err) => {
                    vm.fetchMsg = '同步失敗';
                    console.log(err);
                })

            // let json = JSON.parse(res);
            // vm.list = json.data;
            // console.log(json.data);
        }
    }
});

// $watch 是一个实例方法
vm.$watch('foo', function(newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
    console.log(newValue);
    console.log(oldValue);
})