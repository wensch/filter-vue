var app = new Vue({
  el: '#app',
  data: {
    title: 'Filter Vue!',
    message: 'Adicione uma fruta',
    items: [],
    filtered: []
  },
  
  computed: {
     remaining: function () {
       var itemsLength = this.items.length
       if(itemsLength > 0) {
         return itemsLength
       }
    },
  },

  methods: {
    all: function() {
      return this.filtered = this.items
    },
    
    active: function(item) {
      this.filtered = this.items.filter(function(item) {
        return item.checked === false
      })
    },
    
    completed: function() {
      this.filtered = this.items.filter(function(item) {
        return item.checked === true
      })
    },
    
    addItem: function() {
      var field = document.getElementById('input')
      
      if(field.value !== '') {
        this.items.push({
          fruta: field.value,
          checked: false,
          edit: false
        })
      }
      
      field.value = ''
      this.all()
      this.saveStorage(this.items)
      
      // this.items.findIndex(function(item, index){
      //   console.log('item', item)
      //   console.log('index', index)
      // })
    },

    deleteItem: function(index){
      this.items.splice(index, 1)
      this.saveStorage(this.items)
    },
    
    openInput: function(index, e){
      
      this.items[index].edit = true
      this.$nextTick(function() {
         document.querySelector('.editItem').focus();
       });
    },
    
    editItem: function(index, e) {
      var el = e.target
      if(el.value !== ""){
        this.items[index].fruta = el.value,
        this.items[index].checked = false,
        this.items[index].edit = false
        this.saveStorage(this.items)
        this.closeInput(index)
      }
    },
    
    closeInput: function(index) {
      this.items[index].edit = false
    },
    
    addStorage: function() {      
      this.saveStorage(this.items)
    },

    saveStorage: function(obj) {
     obj = JSON.stringify(obj)
     localStorage.setItem('Fruta', obj)
    },
    
    loadStorage: function() {
      console.log('frutasObj', localStorage.getItem('Fruta'))
      var frutasObj = JSON.parse(localStorage.getItem('Fruta'))
      this.items = frutasObj
      this.filtered = this.items;
    },

    loadTemplate: function() {
      var list = document.getElementsByClassName('list')[0]
      var el = document.getElementById('app')
      list.className += ' animated slideInUp'
      el.className += ' animated fadeIn'

      if(!localStorage.getItem('Fruta')) {
        localStorage.setItem('Fruta', [])
      } else {
        this.loadStorage()  
      }
    }
  }
})

app.loadTemplate()