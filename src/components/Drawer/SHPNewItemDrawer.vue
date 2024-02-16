<template>
    <div class="SHPNewItemDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增
        </Button>

    <Drawer
        title="新增商品"
        v-model="value"
        width="500"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <p>商品內容區</p>
            <Row :gutter="32">
                <Col span="12">

                    <FormItem label="商品名稱-中文" label-position="top">
                        <Input v-model="formData.name" placeholder="請輸入商品名稱" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="商品名稱-英文" label-position="top">
                        <Input v-model="formData.url" placeholder="請輸入商品名稱">
                            <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">

<FormItem label="商品年分" label-position="top">
    <Input v-model="formData.name" placeholder="請輸入商品年分" />
</FormItem>
</Col>
                <Col span="12">
                    <FormItem label="商品現況" label-position="top">
                        <Select v-model="formData.owner" placeholder="選擇商品現況">
                            <Option value="9">九成新</Option>
                            <Option value="9">八成新</Option>
                            <Option value="9">七成新</Option>
                            <Option value="9">六成新</Option>
                            <Option value="9">五成新</Option>
                            <Option value="9">四成新</Option>
                            <Option value="9">三成新</Option>
                            <Option value="9">二成新</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">

                    <FormItem label="商品定價" label-position="top">
                        <Input v-model="formData.name" placeholder="請輸入商品定價" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="置頂下架" label-position="top">
                        <Input v-model="formData.url" placeholder="請輸入商品名稱">
                            <input type="radio" label="置頂">
                            <input type="radio" label="下架">
                            <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="上架時間" label-position="top">
                        <DatePicker v-model="formData.date" type="date" placeholder="請選擇上架時間" style="display: block" placement="bottom-end"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="下架時間" label-position="top">
                        <DatePicker v-model="formData.date" type="date" placeholder="請選擇下架時間" style="display: block" placement="bottom-end"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="商品圖片" label-position="top">
                <Button class="btnUpload" type="file" v-model="File">點我上傳
            </Button>
                <Input class="btnUpload" 
                type="file" 
                multiple="multiple" 
                v-model="File" :rows="4" 
                placeholder="please enter the description" 
                @change="fileChange"/>
            </FormItem>
            <div class="productsin">
                商品介紹區
                <FormItem label="商品介紹(簡述)" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                </FormItem>

                <FormItem label="商品規格" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                </FormItem>
            </div>
        </Form>
        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
            <Button class="btnSubmit" type="primary" @click="value = false">
                <i class="fa-solid fa-screwdriver-wrench"></i>
            新增商品
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
@import '@/assets/scss/components/SHPNewItemDrawer.scss'
</style>