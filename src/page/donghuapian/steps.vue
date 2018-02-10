<template>
	<div>
		<el-steps :active="1" simple>
	      <el-step title="1 选择动画IP" icon="1" status="success" class="first-bz"></el-step>
	      <el-step title="2 确定授权权利" icon="1" :status="steps==1?'finish':'success'"></el-step>
	      <el-step title="3 选择授权品类" icon="1" :status="steps==1?'finish':'success'"></el-step>
	      <el-step title="4 完善信息" icon="1" :status="steps==1?'wait':'finish'"></el-step>
	      <el-step title="5 授权资质认证" icon="1" status="process"></el-step>
	    </el-steps>
    </div>
</template>
<script>
export default{
	props:['steps'],
	data(){
		return{

		}
	},
	methods:{

	}
}
</script>