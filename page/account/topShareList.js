layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            laydate = layui.laydate,
            laytpl = layui.laytpl,
            table = layui.table;

        //新闻列表
        var tableIns = table.render({
            elem: '#topShareList',
            url: '../../json/accountTopShareList.json',
            cellMinWidth: 95,
            page: true,
            height: "full-125",
            limit: 20,
            limits: [10, 15, 20, 25],
            id: "topShareListTable",
            cols: [
                [
                    // {type: "checkbox", fixed:"left", width:50},
                    { field: 'topShareId', title: '序号', width: 70, align: "center" },
                    { field: 'topShareName', title: '用户名', width: 145, align: "center" },
                    { field: 'topShareNickName', title: '昵称', width: 145, align: "center" },
                    { field: 'topShareSup', title: '上级', width: 80, align: "center" },
                    // {field: 'topSharePaymentSystem', title: '支付类型',  align:'center',templet:"#topSharePaymentSystem"},
                    { field: 'topShareBalance', title: '账户余额', width: 180, align: 'center' },
                    { field: 'topShareSubAgent', title: '<a href="searchAgent.html" class="th-link">下级代理</a>', width: 100, align: "center"},
                    { field: 'topShareSubMember', title: '直属会员', width: 100, align: "center" },
                    { field: 'topShareLevel', title: '层级', width: 70, align: "center" },
                    { field: 'topShareRebate', title: '返点', width: 100, align: 'center' },
                    { field: 'topShareAccount', title: '账号', width: 100, align: 'center', templet: "#topShareAccount" },
                    { field: 'topShareBet', title: '投注', width: 100, align: 'center', templet: "#topShareBet" },
                    // {field: 'topShareTop', title: '是否置顶', align:'center', templet:function(d){
                    //     return '<input type="checkbox" name="topShareTop" lay-filter="topShareTop" lay-skin="switch" lay-text="是|否" '+d.topShareTop+'>'
                    // }},
                    {
                        field: 'topShareTime',
                        title: '注册时间',
                        align: 'center',
                        sort: "true",
                        minwidth: 160,
                        templet: function(d) {
                            return d.topShareTime.substring(0, 10);
                        }
                    },
                    { field: 'topShareLogin', title: '登录', width: 60, align: "center" },
                    { title: '操作', width: 280, templet: '#topShareListBar', fixed: "right", align: "center" },
                ]
            ]
        });

        //是否置顶
        form.on('switch(topShareTop)', function(data) {
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
                table.reload("topShareListTable", {
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
        // 20180504  Amanda
        //添加非一级代理
        function addAgent(add) {
            var index = layui.layer.open({
                // title: "添加非一级代理",
                type: 2,
                content: "addnone1sttopShare.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".topShareName").val(add.topShareName);
                        body.find(".abstract").val(add.abstract);
                        body.find(".thumbImg").attr("src", add.topShareImg);
                        body.find("#topShare_content").val(add.content);
                        // body.find(".topShareStatus select").val(edit.topShareStatus);
                        body.find(".topShareNickName").val(add.topShareNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.topShareLook+"']").prop("checked","checked");
                        // body.find(".topShareTop input[name='topShareTop']").prop("checked",edit.topShareTop);
                        form.render();
                    }
                    setTimeout(function() {
                        layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
            layui.layer.full(index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function() {
                layui.layer.full(index);
            })
        }
        
        //编辑文章
        function editAgent(edit) {
            var index = layui.layer.open({
                title: "编辑文章",
                type: 2,
                content: "topShareEdit.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".topShareName").val(edit.topShareName);
                        body.find(".abstract").val(edit.abstract);
                        body.find(".thumbImg").attr("src", edit.topShareImg);
                        body.find("#topShare_content").val(edit.content);
                        // body.find(".topShareStatus select").val(edit.topShareStatus);
                        body.find(".topShareNickName select").val(edit.topShareNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.topShareLook+"']").prop("checked","checked");
                        // body.find(".topShareTop input[name='topShareTop']").prop("checked",edit.topShareTop);
                        form.render();
                    }
                    setTimeout(function() {
                        layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
            layui.layer.full(index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function() {
                layui.layer.full(index);
            })
        }
        $(".topShareedit_btn").click(function() {
                topShareedit();
            })
            
        //上級查看
        table.on('tool(topShareList)', function(obj) {
            var layEvent = obj.event,
                data = obj.data;

            if (layEvent === 'Supdetail') { //上級路徑
                layer.confirm('</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.share + '</p><p>总代：' + obj.data.mainAgent + '</p>', { title: '上级路径' },
                    function(index) {
                        // $.get("删除文章接口",{
                        //     topShareId : data.topShareId  //将需要删除的topShareId作为参数传入
                        // },function(data){
                        tableIns.reload();
                        layer.close(index);
                        // })
                    });
            } else if (layEvent === 'Leveldetail') { //层级路徑
                layer.confirm(obj.data.Level1 + obj.data.Level2 + obj.data.Level3 + obj.data.Level4 + obj.data.Level5 + obj.data.Level6, { title: '<span>okok02</span>层级路径' },
                    function(index) {
                        tableIns.reload();
                        layer.close(index);
                    });
            } else if (layEvent === 'Rebatedetail') { //返点
                layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="180"></colgroup><thead><tr><th>返点平台</th><th>明细</th></tr></thead>' +
                    '<tbody><tr><td>AG</td><td>' +
                    obj.data.RebateAG +
                    '%</td></tr><tr><td>OG</td><td>' +
                    obj.data.RebateOG +
                    '%</td></tr><tr><td>BB</td><td>' +
                    obj.data.RebateBB +
                    '%</td></tr><tr><td>ALLBET</td><td>' +
                    obj.data.RebateALLBET +
                    '%</td></tr></tbody></table>', { title: '返点' },
                    function(index) {
                        tableIns.reload();
                        layer.close(index);
                    });



            } else if (layEvent === 'edit') { //编辑
                editAgent(data);
            } else if (layEvent === 'authority') { //權限
                layer.confirm('此账户权限为 OOOO', { icon: 3, title: '账户权限' }, function(index) {
                    tableIns.reload();
                    layer.close(index);
                });
            } else if (layEvent === 'info') { //账户信息
                layer.alert("账户信息账户信息账户信息账户信息账户信息")
            } else if (layEvent === 'add') { //添加
                addAgent(data);
            } else if (layEvent === 'add1st') { //添加
                addAgent1st(data);
            }
        });



    })
    // blockquote.on('tool(add1st)', function(obj) {
    //     var layEvent = obj.event,
    //         data = obj.data;

//     if (layEvent === 'add1st') { //添加
//         add1st(data);
//     }
// });