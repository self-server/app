import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['general']),
    hostname: () => this.general.hostname,
    uptime: () => this.general.uptime,
    online: () => this.general.online
  }
}