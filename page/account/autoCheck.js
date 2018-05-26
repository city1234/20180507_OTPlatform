layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            laydate = layui.laydate,
            laytpl = layui.laytpl,
            table = layui.table;

        //新闻列表
        var tableIns = table.render({
            elem: '#autoCheck',
            url: '../../json/autoCheck.json',
            cellMinWidth: 95,
            page: true,
            height: "full-125",
            limit: 20,
            limits: [10, 15, 20, 25],
            id: "autoCheckTable",
            cols: [
                [
                    { field: 'autoCheckLevel', title: '层级', width: 150, align: "center", templet: "#autoCheckLevel" },
                    { field: 'autoCheckAccount', title: '账号', width: 150, align: 'center' },
                    { field: 'autoCheckMsg', title: '讯息', align: "center" },
                    {
                        field: 'autoCheckTime',
                        title: '登入时间',
                        align: 'center',
                        sort: "true",
                        width: 250,
                        templet: function(d) {
                            return d.autoCheckTime.substring(0, 20);
                        }
                    },
                    { field: 'autoCheckIP', title: 'IP位置', width: 180, align: 'center' },
                ]
            ]
        });

        //是否置顶
        form.on('switch(autoCheckTop)', function(data) {
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

        //查询【此功能需要后台配合，所以暂时没有动态效果演示】
        $(".search_btn").on("click", function() {
            if ($(".searchVal").val() != '') {
                table.reload("autoCheckListTable", {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        key: $(".searchVal").val() //查询的关键字
                    }
                })
            } else {
                layer.msg("请输入查询的内容");
            }
        });
        // 20180504  Amanda
        //添加非一级代理
        function addAgent(add) {
            var index = layui.layer.open({
                // title: "添加非一级代理",
                type: 2,
                content: "addnone1stautoCheck.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".autoCheckName").val(add.autoCheckName);
                        body.find(".abstract").val(add.abstract);
                        body.find(".thumbImg").attr("src", add.autoCheckImg);
                        body.find("#autoCheck_content").val(add.content);
                        // body.find(".autoCheckStatus select").val(edit.autoCheckStatus);
                        body.find(".autoCheckNickName").val(add.autoCheckNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.autoCheckLook+"']").prop("checked","checked");
                        // body.find(".autoCheckTop input[name='autoCheckTop']").prop("checked",edit.autoCheckTop);
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
                content: "autoCheckEdit.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".autoCheckName").val(edit.autoCheckName);
                        body.find(".abstract").val(edit.abstract);
                        body.find(".thumbImg").attr("src", edit.autoCheckImg);
                        body.find("#autoCheck_content").val(edit.content);
                        // body.find(".autoCheckStatus select").val(edit.autoCheckStatus);
                        body.find(".autoCheckNickName select").val(edit.autoCheckNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.autoCheckLook+"']").prop("checked","checked");
                        // body.find(".autoCheckTop input[name='autoCheckTop']").prop("checked",edit.autoCheckTop);
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
        $(".autoCheckedit_btn").click(function() {
                autoCheckedit();
            })
            
        //上級查看
        table.on('tool(autoCheckList)', function(obj) {
            var layEvent = obj.event,
                data = obj.data;

            if (layEvent === 'Supdetail') { //上級路徑
                layer.confirm('</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.autoCheck + '</p><p>总代：' + obj.data.autoCheck + '</p>', { title: '上级路径' },
                    function(index) {
                        // $.get("删除文章接口",{
                        //     autoCheckId : data.autoCheckId  //将需要删除的autoCheckId作为参数传入
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