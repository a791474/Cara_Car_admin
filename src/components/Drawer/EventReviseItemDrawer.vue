<template>
    <div class="reviseItemDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

    <Drawer
        title="修改消息"
        v-model="value"
        width="450"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">

    <!-- 消息標題 -->
    <Row :gutter="32">
        <Col span="24">
            <FormItem label="消息標題" label-position="top">
                <Input v-model="formData.eventTitle" placeholder="請輸入消息標題" />
            </FormItem>
        </Col>
    </Row>

    <!-- 消息分類 -->
    <Row :gutter="32">
        <Col span="24">
            <FormItem label="消息分類" label-position="top">
                <Select v-model="formData.classify" placeholder="請選擇消息分類">
                    <Option value="discount">優惠</Option>
                    <Option value="activity">活動</Option>
                </Select>
            </FormItem>
        </Col>
    </Row>


    <Row :gutter="32">
        <Col span="12">
            <FormItem label="上架時間" label-position="top">
                <DatePicker v-model="formData.startDate" type="daterange" placeholder="請設定上架時間" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="下架時間" label-position="top">
                <DatePicker v-model="formData.endDate" type="daterange" placeholder="請設定下架時間" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
        </Col>
    </Row>
    <FormItem label="消息圖片" label-position="top">
        <Input type="file" v-model="formData.eventImg" :rows="10" />
    </FormItem>
    <FormItem label="消息內容" label-position="top">
        <Input type="textarea" v-model="formData.eventInformation" :rows="10" placeholder="請輸入消息介紹資訊" />
    </FormItem>
        </Form>


        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
            <Button class="btnSubmit" type="primary" @click="value = false">
                <i class="fa-solid fa-screwdriver-wrench"></i>
            確認修改
            </Button>
        </div>
    </Drawer>

    </div>
</template>    

<script>

export default {
    data () {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                eventTitle: '玩具車攝影比賽',
                classify: '',
                disLaunch: '',
                startDate: '',
                endDate: '',
                eventImg: '',
                eventInformation: ''
            },
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/eventReviseItemDrawer.scss'
</style>