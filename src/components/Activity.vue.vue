<template>
    <div class="main">
        <h1>Task Manager</h1>
        <div class="noActivity" v-if="isEmpty">
            <el-alert
                    title="There are not activities at this moment"
                    type="info"
                    :center="true"
                    show-icon
                    :closable="false">
            </el-alert>
        </div>
        <div v-else>
            <el-table
                    :data="activities"
                    :row-class-name="tableRowColor">
                <el-table-column
                        prop="task"
                        label="Task">
                </el-table-column>
                <el-table-column
                        label="Time">
                    <template slot-scope="scope">
                        
                        <span>{{getDate(scope.row.date)}}</span>
                    </template>
                </el-table-column>


                <el-table-column
                        label="Remove">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" @click="removeActivity(scope.row)" circle
                                   size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div v-if="isWrongActivity" class="wrongNotification">
            <el-alert
                    :title="errorMessage"
                    type="error"
                    :center="true"
                    show-icon
                    :closable="false">
            </el-alert>
        </div>

        <div>
            <el-row>
                <el-col :span="3">
                    Task:
                </el-col>

                <el-col :span="6">
                    <el-input placeholder="Please input the activity"
                              v-model="activity" size="mini">
                    </el-input>
                </el-col>

                <el-col :span="3">
                    Time:
                </el-col>

                <el-col :span="5">
                    <el-time-picker
                            v-model="date"
                            placeholder="Pick a time">
                    </el-time-picker>
                    <!--
                    <el-input placeholder="Please input the time: dd/mm/yyyy"
                              v-model="time" size="mini">
                    </el-input>-->
                </el-col>
                

            </el-row>

            <el-button type="sucess" round 
                       @click="addActivityMethod()"> Add</el-button>

        </div>

        <div>
            <el-row type="flex" justify="center" class="counterSection">
                <el-col :span="3">
                    Completed :
                </el-col>
                <el-col :span="1">
                    {{completed}}
                </el-col>
                <el-col :span="2">
                    Total :
                </el-col>
                <el-col :span="1">
                    {{total}}
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import moment from 'moment'
    export default {
        name: 'Activity',
        data() {
            return {
                activity: '',
                wrong: false,
                date: '',
                errorMessage: ''
            }
        },
        computed: {
            ...mapGetters({
                'activities': 'getActivities'
            }),
            isWrongActivity() {
                return this.wrong
            },
      
            completed() {
                return this.activities.filter((val) => val.completed === true).length;
            },
            total() {
                return this.activities.length;
            },
            isEmpty() {
                return this.activities.length === 0;
            }


        },
        methods: {
            ...mapActions(['addActivity', 'deleteActivity', 'changeActivityState']),
            addActivityMethod() {
                if (this.validateData() === true) {
                    const activity = {
                        task: this.activity,
                        completed: false,
                        date: this.date
                    };

                    this.addActivity({activity});
                    this.activity = '';
                    this.date = '';
                    this.wrong = false;

                } else {
                    this.wrong = true;
                    this.setMessageError();
                }
            },

            removeActivity(item) {
                this.deleteActivity({activity: item})
            },

            completeActivity(item) {
                this.changeActivityState({activity: item})
            },
            tableRowColor({row}) {
                if (row.completed === true) {
                    return 'success-row';
                } else {

                    return 'warning-row'
                }
                return '';
            },
            validateData() {
                if (this.activity !== '' && this.date !== '') {
                    return true;
                } else {
                    return false;
                }
            },

            setMessageError() {
                if (this.activity === '' && this.date === '') {
                    this.errorMessage = 'The activity && the time are empty';
                } else {
                    if (this.activity === '') {
                        this.errorMessage = 'The activity is empty';
                    } else {
                        this.errorMessage = 'The time is empty';

                    }
                }
            },

            getDate (item) {
               return moment(item).format('LTS')
            },

            alarmPlay() {
                if(this.date === moment().format('LTS')){
                  this.errorMessage = "Alarm"  
                }
            }

            
            

        }
    }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
  }
    .main {
        text-align: center;
         box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
         background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
    }
    h1{
        margin-top: 50px;
        margin-bottom: 50px;
    }
 noActivity{
     text-decoration: bold;
     border: 2px;
 }
    .wrongNotification {
        margin-bottom: 0.2rem;
        width: 80%;
        margin-left: 10%;
        color: #FF0000; 
        text-align: center
    }
 
  .el-button{
      margin-bottom: 100px;
      margin-top:40px;
      background: green;
      color: white;
  }

    div.cell {
        text-align: center;
    }

    .counterSection {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .el-table .warning-row {
        margin-bottom: 30px;
        background: oldlace;
    }

    .el-table .success-row {
        background: #91bd79;

    }
</style>