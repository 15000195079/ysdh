<template>
	<div>
		<el-input placeholder="请输入内容" v-model="keys" size="medium" class="input-with-select" clearable>
			<el-button slot="append" icon="el-icon-search"></el-button>
		</el-input>
	</div>
</template>
<script>
export default {
  props: ["keys"],
  datat() {
    return {};
  },
  watch: {
    keys(newValue, oldValue) {
      this.getSousuo();
    }
  },
  methods: {
    getSousuo() {}
  }
};
</script>