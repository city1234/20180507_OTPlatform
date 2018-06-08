layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#remitStoreList',
        url: '../../json/remitStoreList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "remitStoreListTable",
        cols: [
            [
                { field: 'storeId', title: '编号', width: 60, align: "center" },
                { field: 'storeName', title: '商家代称', width: 300, align: "center" },
                { field: 'storePaymentType', title: '支付系统', width: 200, align: 'center' },
                { field: 'storeNumber', title: '商号', align: 'center' },
                { field: 'storeLevel', title: '层级名称', width: 450, align: "center" },
                { title: '操作', width: 280, templet: '#remitStoreListBar', fixed: "right", align: "center" }
            ]
        ]
    });

    //是否置顶
    form.on('switch(storeTop)', function(data) {
        var index = layer.msg('修改中，请稍候', { icon: 16, time: false, shade: 0.8 });
        setTimeout(function() {
            layer.close(index);
            if (data.elem.checked) {
                layer.msg("置顶成功！");
            } else {
                layer.msg("取消置顶成功！");
            }
        }, 500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("storeListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val() //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    
    // //列表操作
    // table.on('tool(storeList)', function(obj) {
    //     var layEvent = obj.event,
    //         data = obj.data;

    //     if (layEvent === 'edit') { //编辑
    //         addStore(data);
    //     } else if (layEvent === 'del') { //删除
    //         layer.confirm('确定停用此商户？', { icon: 3, title: '提示信息' }, function(index) {
    //             // $.get("删除文章接口",{
    //             //     storeId : data.storeId  //将需要删除的storeId作为参数传入
    //             // },function(data){
    //             tableIns.reload();
    //             layer.close(index);
    //             // })
    //         });
    //     } else if (layEvent === 'look') { //预览
    //         layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
    //     }
    // });

})