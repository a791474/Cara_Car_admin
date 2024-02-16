<script>
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
    },
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
            orderList: [
                {
                    orderNo: "1111",
                    memberNo: "20000221",
                    productName: "超強小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "2222",
                    memberNo: "20000222",
                    productName: "急速小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "3333",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "4444",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "5555",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "6666",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "7777",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "8888",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "9999",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
            ]
        }
    },
    methods: {
        toggleStatus(index) {
            this.admins[index].status = !this.admins[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        }
    },
}
</script>

<!-- 未改 -->
<div class="switch">
    <Space direction="vertical">
        <Space>
            <Switch size="large">
                <template #open>
                <span>已出</span>
                </template>
                <template #close>
                <span>未出</span>
                </template>
            </Switch>
        </Space>
    </Space>
</div>