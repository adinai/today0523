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
                        prop="name"
                        label="Name">
                </el-table-column>
                <el-table-column
                        label="Date">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{getDate(scope.row.time)}}</span>
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
        <div>
            <el-row type="flex" justify="center" class="counterSection">
                <el-col :span="4">
                    Completed :
                </el-col>
                <el-col :span="2">
                    {{completed}}
                </el-col>
                <el-col :span="3">
                    Total :
                </el-col>
                <el-col :span="2">
                    {{total}}
                </el-col>
            </el-row>
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
                    Activity:
                </el-col>

                <el-col :span="8">
                    <el-input placeholder="Please input the activity"
                              v-model="activity" size="mini">
                    </el-input>
                </el-col>

                <el-col :span="3">
                    Date:
                </el-col>

                <el-col :span="8">
                    <el-time-picker
                            v-model="value2"
                            type="time"
                            placeholder="Pick a day">
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
                time: '',
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
                        name: this.activity,
                        completed: false,
                        time: this.time
                    };

                    this.addActivity({activity});
                    this.activity = '';
                    this.time = '';
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
                if (this.activity !== '' && this.time !== '') {
                    return true;
                } else {
                    return false;
                }
            },

            setMessageError() {
                if (this.activity === '' && this.time === '') {
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
               value2: new Date(2016, 9, 10, 18, 40),
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
         box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }

  }
  .el-col {
    border-radius: 4px;
  }
  .el-button{
      margin-bottom: 100px;
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
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>