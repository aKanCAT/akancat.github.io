var obj = {
    foo: 'bar'
}

//Object.freeze(obj)

var vm = new Vue({
    el: '#app',
    data: obj
})

// $watch 是一个实例方法
vm.$watch('foo', function (newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
    console.log(newValue);
    console.log(oldValue);
})