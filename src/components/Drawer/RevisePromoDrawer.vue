<template>
    <div class="revisePromoDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

    <Drawer
        title="新增促銷"
        v-model="value"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣率" label-position="top">
                        <Input v-model="formData.name" placeholder="請輸入0~100之間" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣類別" label-position="top">
                        <Select v-model="formData.owner" placeholder="請選擇優惠類別">
                            <Option value="">電動車</Option>
                            <Option value="">模型車</Option>
                            <Option value="">配件</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣開始時間" label-position="top">
                        <Input type="date" v-model="formData.name" placeholder="請輸入開始時間"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣結束時間" label-position="top">
                        <Input type="date" v-model="formData.name" placeholder="請輸入結束時間"></Input>
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="" label-position="top">
                <ul style="display: flex; justify-content:space-around;">
                    <li>已選取商品</li>
                    <li>定價</li>
                </ul>
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="001 商品名稱 10000" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false">取消修改</Button>
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
                name: '',
                url: '',
                owner: '',
                type: '',
                approver: '',
                date: '',
                desc: ''
            },
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/revisePromoDrawer.scss'
</style>