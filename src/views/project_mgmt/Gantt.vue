i/* @jsxImportSource vue */



<template>
<div>
  <div class="buttons" dir="rtl">
  <input type=button class="button" value="بر اساس زمان" v-on:click="changeWeights()" />
  <input type=button class="button" value="ویرایش" v-on:click="editGant()" />
  <input type=button class="button" value="ثبت" v-on:click="saveGantt()" />
  <input type=button class="button" value="روز" v-on:click="setScaleConfig('day')" />
  <input type=button class="button" value="ماه" v-on:click="setScaleConfig('month')" />
  <input type=button class="button" value="سال" v-on:click="setScaleConfig('year')" />
  </div>
  <div ref="gantt" class="gannt"></div>
  </div>
</template>

<script lang="jsx">
import { gantt } from '@yahmat/dhtmlxgantt';
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import PDatePicker from './PDatePickerView.vue';
import { createVNode, render, h } from 'vue'
import moment from 'moment';

export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {
            data: [
      {
        id: "10",
        text: "پروژه تست",
        calendar_id: "persian",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
        type: 'project'
      },
      {
        id: "1",
        text: "Task #1",
        calendar_id: "persian",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.9,
        parent: "10",
        type: 'task'
      },
      {
        id: "2",
        text: "Task #2",
        calendar_id: "persian",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
        type: 'task'
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
        }
      }
    }
  },

    beforeMount() {
       var calendarId = gantt.addCalendar({
            id:"persian", // optional
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 1, 1, 1, 1,0, 0 ,1]
            }
        });

        var pCalendar = gantt.getCalendar("persian");
        var holidays = ["01-04-2025"]
        var format_date = gantt.date.str_to_date("%d-%m-%Y");
        
        for (var i = 0; i < holidays.length; i++) {
          var converted_date = format_date(holidays[i])
          console.log(converted_date);
          pCalendar.setWorkTime({ date: converted_date , hours: false })
        }
        
        gantt.config.readonly = true;
        gantt.config.date_format = "%d-%m-%Y";
        gantt.config.work_time = true; 
        gantt.config.correct_work_time = true;
        
 

        gantt.i18n.setLocale('fa');
        gantt.config.jalali = true;
        gantt.locale.date.day_short= [
            "يکشنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنجشنبه",
            "جمعه",
            "شنبه"
        ];
        gantt.config.autofit = true;
        gantt.config.grid_width = 800;  
        gantt.config.rtl = true
        gantt.config.scale_height = 80;
        gantt.config.row_height = 40;
        gantt.config.scales = [
            {unit: "month", step: 1, format: "%F, %Y"},
            {unit: "day", step: 1, format: "%j, %D", css:function(date) {
              if(!pCalendar.isWorkTime(date)) {
                return "weekend"
              }
            }}
        ];
        gantt.config.show_tasks_outside_timescale = true;
        gantt.config.open_tree_initially = true;
        gantt.templates.progress_text=function(start,end,task){let prog = Math.round(task.progress * 100 ); return prog  + '%';};

        gantt.config.layout = {
            css: "gantt_container",
            rows: [
                {
                    cols: [
                        {view: "scrollbar", id: "scrollVer"},
                        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                        {resizer: true, width: 1},
                        {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
                    ]
                },
                {view: "scrollbar", id: "scrollHor", height: 20}
            ]
        };

        var textEditor = {type: "text", map_to: "text"};
        var numberEditor = {type: "number", map_to: "weight"};
        gantt.config.columns = [
        {name:"text", label:"عنوان",  tree:true, width:"250", editor:textEditor},
        // {name:"start_date", label:"Start time", align: "center"},
        {name:"duration",   label:"مدت",   align: "center", width:"60"},
        {name:"start_date", label:"تاریخ شروع", align: "center", width:"120"}, 
        {name:"end_date", label:"تاریخ پایان", align: "center", width:"120"},
        {name:"weight", label:"وزن", align: "center", width:"50" ,editor:numberEditor},
        {name:"hr", label:"نفرساعت",align: "center", width:"50" , editor:numberEditor},
        {name:"cost", label:"هزینه",align: "center", width:"50" , editor:numberEditor},
        {name:"actual", label:"پیشرفت",align: "center", width:"50",  
        template: function(obj) {
          return Math.round(obj.progress*100) + '%'
        }}, 
        {name:"add", label:"", width:50},  
        ];
    },
  mounted: function () {
        gantt.config.start_date = new Date(2025, 0o2, 29);
        gantt.config.end_date = new Date(2027, 0o6, 28);
        gantt.config.lightbox.sections = [
            {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
            {name:"type", type: "typeselect", map_to: "type"},
            {name:"time", height:72, type:"duration", map_to:"auto"},
        ];

        gantt.templates.grid_row_class = function( start, end, task ){
            if ( task.$level > 1 ){
                return "nested_task"
            }
            return "";
        };

        

        gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
            //any custom logic here
            if(task.id=="10") {
               return false;
            }
            return true;
            
        });

        gantt.attachEvent("onAfterTaskAdd", function(id,task){
            //any custom logic here
            //gantt.updateTask(id, task); 
        });

        // functionality 
        gantt.attachEvent("onAfterTaskUpdate", function(id, task){
            parent_progress(id);
            parent_weight(id);
            var changed_task = gantt.getTask(id);
            var links = gantt.getLinks()
            // update links
            links.forEach(item => {
                let target = gantt.getTask(item.target);
                if(item.source == task.id) {
                    target.start_date = task.end_date;
                    target.end_date = gantt.calculateEndDate({start_date:task.end_date, duration: target.duration, task:target});
                    gantt.updateTask(target.id)
                }
            });

            links.forEach(item => {
                let target = gantt.getTask(item.target);
                let source = gantt.getTask(item.source);
                if(item.target == task.id) {
                    if(source.end_date > target.start_date) {
                        target.start_date = task.end_date;
                        target.end_date = gantt.calculateEndDate({start_date:task.end_date, duration: target.duration});
                        gantt.updateTask(target.id)
                    }
                }
            });

             // update Parents 
            if (changed_task.parent != "10") {
                var parent = gantt.getTask(changed_task.parent)
                var children = gantt.getChildren(parent.id);

                var arrOfStartDates = []  
                var arrOfEndDates = []
                
                children.forEach(item => {
                    arrOfStartDates.push(gantt.getTask(item).start_date)
                    arrOfEndDates.push(gantt.getTask(item).end_date)
                });
                let startMoments = arrOfStartDates.map(d => moment(d))
                let endMoments = arrOfEndDates.map(d => moment(d))
                let minStartDate = moment.min(startMoments)
                let maxEndDate = moment.max(endMoments)

                parent.start_date = minStartDate["_i"]
                parent.end_date = maxEndDate["_i"]

                gantt.updateTask(parent.id);        

            } 
            return true;
        });

        gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    //any custom logic here
            if(is_new) {
              task.calendar_id="persian";
            }
            return true;
        });

        gantt.attachEvent("onAfterTaskAdd", function(id, task){
            //gantt.getTask(task.id);
            //gantt.updateTask(task.id)
            return true;
        });

        gantt.attachEvent("onBeforeLinkAdd", function(id, link){
           var sourceTask = gantt.getTask(link.source);
           var targetTask = gantt.getTask(link.target);

           if(targetTask.parent == sourceTask.id) {
              return false;
           }

          // if (link.type == 0){
             
          //     if (sourceTask.end_date >= targetTask.start_date){
          //         alert("This link is illegal")
          //         return false;
          //     }
          // }

        });

        gantt.attachEvent("onLinkCreated", function(link){
            // your code here
            let sourceTask = gantt.getTask(link.source)
            let targetTask = gantt.getTask(link.target)
             if(targetTask.parent == sourceTask.id) {
              return false;
            }
            if(sourceTask.end_date > targetTask.start_date) {
                targetTask.start_date = sourceTask.end_date;
                targetTask.end_date = gantt.calculateEndDate({start_date:sourceTask.end_date, duration: targetTask.duration});
                gantt.updateTask(targetTask.id) 
            }
            // gantt.updateTask(gantt.getTask(link.target));
            return true;
        });

    function parent_progress(id){
      gantt.eachParent(function(task){
        var children = gantt.getChildren(task.id);
        var child_progress = 0;
        var child_weights_sum = 0;
        for (var i = 0; i < children.length; i++) {
          var child = gantt.getTask(children[i])
          let w = child.weight ? parseInt(child.weight) : 0;
          child_progress += (child.progress * 100 * w);
          child_weights_sum += w;
        }
        task.progress = child_progress / child_weights_sum / 100;
      }, id)  
      gantt.render();
    }

    function parent_weight(id) {
    gantt.eachParent(function(task){
        var children = gantt.getChildren(task.id);
        var child_weight = 0;
        for (var i = 0; i < children.length; i++) {
          var child = gantt.getTask(children[i])
          child_weight += child.weight ? parseFloat(child.weight) : 0
        }
        task.weight = child_weight ;
      }, id)  
      gantt.render();
    }



    gantt.templates.scale_cell_class = function(date){
      var pCalendar = gantt.getCalendar("persian");
      if(!pCalendar.isWorkTime(date)) {
        return "weekend"
      }
    };

    gantt.templates.timeline_cell_class = function(item,date){
      var pCalendar = gantt.getCalendar("persian");
      if(!pCalendar.isWorkTime({ date: date, task: item })) {
        return "weekend";
      }
    };

    gantt.config.xml_date = "%d-%m-%Y";
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  }, 
  methods: {
    changeWeights() {
      //var gantt = this.gantt;
      // let project = gantt.getTask("10");
      // let wduration = project.duration;
      let sumDuration = 0;
      gantt.eachTask((task) => {
        if(task.type == 'task') {
          if (gantt.getChildren(task.id).length == 0) {
          sumDuration += gantt.getTask(task.id).duration;
          }
        }
      })
      gantt.eachTask((task)=> {
        if(task.type == 'task') {
          if (gantt.getChildren(task.id).length == 0) {
            let dur = gantt.getTask(task.id).duration;
            let w = dur/sumDuration * 100;
            w = w.toFixed(2);
            task.weight = w;
            gantt.updateTask(task.id);
            gantt.render;
        }
      }
      })

    }, 
    editGant() {
      gantt.config.readonly = false;
      gantt.render();
    }, 
    saveGantt() {
      gantt.config.readonly = true;
      gantt.render();
    },

    setScaleConfig(level) {
    switch (level) {
        case "day":
            gantt.config.scales = [
                {unit: "day", step: 1, format: "%d %M"}
            ];
            gantt.config.scale_height = 27;
            break;
        case "week":
            var weekScaleTemplate = function (date) {
              var dateToStr = gantt.date.date_to_str("%d %M");
              var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
              return dateToStr(date) + " - " + dateToStr(endDate);
            };
            gantt.config.scales = [
                {unit: "week", step: 1, format: weekScaleTemplate},
                {unit: "day", step: 1, format: "%D"}
            ];
            gantt.config.scale_height = 50;
            break;
        case "month":
            gantt.config.scales = [
                {unit: "month", step: 1, format: "%F, %Y"},
                {unit: "day", step: 1, format: "%j, %D"}
            ];
            gantt.config.scale_height = 50;
            break;
        case "year":
            gantt.config.scales = [
                {unit: "year", step: 1, format: "%Y"},
            ];
            gantt.config.scale_height = 90;
            break;
        }
        gantt.render();
    }
  },

  // cutom
  
}
</script>

<style>
    @import "../../../node_modules/dhtmlx-gantt/codebase/sources/dhtmlxgantt.css";
    /* @import "../../../node_modules/dhtmlx-gantt/codebase/sources/skins/dhtmlxgantt_material.css"; */
    /* @import "../../../node_modules/dhtmlx-gantt/codebase/sources/skins/dhtmlxgantt_broadway.css"; */
    .gannt {
        height: 600px !important    ;
    }

    .dhx_cal_ltext {
        text-align: center;
    }

    .gantt_section_time {
      direction: rtl;
      display: inline-flex;
      float: right;
    }

    .gantt_cal_light {
      direction: rtl;
    }

    .gantt_cal_larea{
      padding: 10px;
    }

    .weekend{ background: #e9e9e9 !important;}

    .gantt_task_line ,.gantt_bar_task {
      border-radius : 15px;
    }

    .button {
      font-family: 'Vazir';
    }

     
</style>
 