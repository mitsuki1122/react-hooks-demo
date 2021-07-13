function fn() {
    console.log('6666');
    let name = '';
    console.log('name', name);
    return function () {
        name = 'kkkkk';
    }
}
// 关于name的访问范围，因此不能在function组件的return中赋值，因为在fn中是访问不到赋值之后的值的。