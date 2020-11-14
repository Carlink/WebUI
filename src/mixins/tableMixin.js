export default {
    data() {
        return {
            cellHeight: 10,
            headerHeight: 10,
            visibleCells: 5,
            tableWidth: 100,
            buttonPosition: 0,
            tableClass: ''
        }
    },
    methods: {
        setVisibleGrid(tableClass) {
            this.tableClass = tableClass
            this.$nextTick(() => {
              const trHeight = document.querySelector(this.tableClass + " tbody tr");              
              this.cellHeight = (trHeight || {}).offsetHeight
              const thHeight = document.querySelector(this.tableClass + " thead th");
              this.headerHeight = (thHeight || {}).offsetHeight
              const tbody = document.querySelector(this.tableClass + " .v-data-table__wrapper");
              const computedHeight = (this.cellHeight * this.visibleCells) + this.headerHeight
              this.tableWidth = (tbody || {}).offsetWidth
              // Saved line if scroll needed
              // tbody.style.height = computedHeight + "px"
              this.buttonPosition = tbody.scrollLeft + (this.tableWidth / 2) - 52      
              tbody.addEventListener(
                'scroll', ()=> {
                    this.buttonPosition = tbody.scrollLeft + (this.tableWidth / 2) - 52
                }, false
              )
            })
          },
          resizeReviewButton() {
            const tbody = document.querySelector(this.tableClass + " .v-data-table__wrapper");
            this.tableWidth = (tbody || {}).offsetWidth
          },
    },
    mounted() {
        this.fetchData()
        window.onresize = (event) => {
            this.resizeReviewButton()
        }; 
    }
};