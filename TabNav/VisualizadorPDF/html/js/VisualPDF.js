<script>
    var myState = {
        pdf: null,
        currentPage: 1,
        zoom: 1
    }
    pdfjsLib.getDocument('./BoletinIEsapiens.pdf').then(pdf)=>{
        myState.pdf=pdf;
        render();
        function render(){
            myState.pdf.getPage(myState.currentPage).then((page)=>{
                
            })
    }
    
    }
</script>