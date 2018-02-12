/**
 * Created by xiaxue on 2017/5/13.
 */
var order={};
order.load=function(){
    $(".order ul li label").next().attr("disabled",true);

    //历史日期不可编辑

    var $selectDate;
    var $dateNow=Date.parse(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate());
   $("#calendar").change(function(){
       $selectDate=Date.parse($("#calendar").val());
       if($selectDate<$dateNow){
           $(".order ul li label").next().next().attr("disabled",true);
       }else{
           $(".order ul li label").next().next().attr("disabled",false);
       }
   })
}





