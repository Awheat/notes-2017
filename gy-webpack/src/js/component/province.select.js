/**
 * 省市区连动JS插件
 * Created by zhangzhigang on 2016/12/20.
 * 使用规则
 * 第一级 select 
 <select id="province" data-v="第一个默认值,第二个默认值,第三个默认值" data-id="第二个控件id,第三个控件id" data-name="第二个控件name,第三个控件name"></select>
 绑定  ：  
 $("#province").select();//这就行了
 
 说明:如果不需要三级的话，就填写到第二个就行了
 */
(function(){
    if(!window.province){
        return;
    }
    var base={
        id:[],province:{},def:'<option value="">--请选择--</option>'};
    /**
     * 绑定到省的控件中
     * @param provinceid 省控件id
     */
    $.fn.select=function(){
        //默认值
        var next=base.province=$(this);
	
        var v=base.province.data("v").split(',');
        var province_value=v[0];
        var option=province_value==0 && province_value=='' ?province.childrenOption(0) :province.siblingsOption(province_value);
        option=option==""?province.childrenOption(0):option;
        base.province=base.province.html(base.def+option);
        base.province.bind("change",change);
        //id
        var data_id=base.province.data("id");
        if(!data_id){return};
        base.id=data_id.split(',');
        //name
        var name=base.province.data("name").split(',');

        /*根据id数量显示select数量*/
        for(var i=0;i<base.id.length;i++){
            $('<select id="'+base.id[i]+'" name="'+name[i]+'" style="margin-left: 10px;">'+base.def+'</select>').insertAfter(next);
            next=$('#'+base.id[i]);
            var def_value=v[i+1];
            if(def_value!=0 && def_value!=''){
                next.html(base.def+province.siblingsOption(def_value));
            }
            if(i!=base.id.length-1){
                next.bind('change',change);
            }
        }

    }
    function change(){
        var that=$(this);
        that.nextAll('select').html(base.def);
        var v=that.val();
        if(v!=''){

            var option=province.childrenOption(v);
            if(option!=''){
                //查询来有几个
                var $option=$(option);
                if($option.length==1 && base.id.length==1){
                    //只有一个 直辖市
                    //直接显示下一级
                    var code=$option.attr("value");
                    option=province.childrenOption(code);
                }
                that.next("select").html(base.def+option);
            }
        }
    }
})();