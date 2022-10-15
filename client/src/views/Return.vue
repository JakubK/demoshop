<template>
  <div class="container">
    <div class="return-wrapper">
      <div class="loader" v-if="processing">
        <TransactionLoader />
        <p>
          Weryfikujemy status Twojej płatności
        </p>
      </div>
      <div class="success-wrapper" v-if="isSuccess()">
        <TransactionSuccess />
        <p>Zamówienie na kwotę {{ parseFloat(amount) }} zostało opłacone</p>
      </div>
      <div class="error-wrapper" v-if="isError()">
        <TransactionError />
        <p>Nie udało się opłacić zamówienia na kwotę {{ parseFloat(amount) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axiosInstance from '../api'
import { ENDPOINTS } from '../const/endpoints.const'
import { TRANSACTION_STATUSES } from '../const/transactionStatuses.const'
import TransactionLoader from '../components/TransactionLoader.vue'
import TransactionSuccess from '../components/TransactionSuccess.vue'
import TransactionError from '../components/TransactionError.vue'
import { onMounted, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'


const status: Ref<any> = ref(null);
const statusCheckHandler: Ref<any> = ref(null);
const amount: Ref<any> = ref(null);
const processing = ref(true);

const route = useRoute();

const checkStatusData = () => {
  const payload = {
      orderId: route.query.OrderID
    }

    axiosInstance.post(ENDPOINTS.status, payload)
      .then((response: any) => {
        const { status: newStatus, amount: newAmount } = response?.data?.transaction || {}

        status.value = newStatus
        amount.value = newAmount

        if (status.value === TRANSACTION_STATUSES.success || status.value === TRANSACTION_STATUSES.error) {
          clearTimeout(statusCheckHandler.value)
          processing.value = false
        }
      })
      .catch((error: any) => {
        console.log(error)
      })

    statusCheckHandler.value = setTimeout(() => {
      checkStatusData()
    }, 3000)
}

const isSuccess = () => {
  return status.value === TRANSACTION_STATUSES.success
}

const isError = () => {
  return status.value === TRANSACTION_STATUSES.error
}

onMounted(() => {
  checkStatusData();
})

</script>
<style lang="scss" src="../scss/Return.scss"></style>
