<template>
    <div class="margin-bottom-40">
        <transition name="el-fade-in-linear">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>