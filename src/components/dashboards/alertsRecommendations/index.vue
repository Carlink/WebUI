<template>
  <div>
    <CardHeader :title="title" />
    <AlertsRecommendations :alerts="alerts" />
  </div>
</template>
<script>
import CardHeader from '../../shared/CardHeader'
import alerts from '@/data/alerts.json'
import AlertsRecommendations from './AlertsRecommendations'
export default {
  name: 'alert-and-recommendations-layout',
  data() {
    return {
      title: 'Alerts & Recommendations',
      alerts: alerts,
    }
  },
  components: {
    CardHeader,
    AlertsRecommendations,
  },
}
</script>
