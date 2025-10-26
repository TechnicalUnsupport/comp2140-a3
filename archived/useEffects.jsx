// (1) update record values per index
  const updateValue = (index) => (val) => {
    console.log(index,val)
    const nextVals = recordValues.map(v=>{return{
      ...v,
      value:(v.idx === index ? val : v.value)
    }})
    console.log('next',nextVals);
    setRecordValues(nextVals);
    console.log(recordValues);
  }

  // for readabliy
  // GET fields
  const fetchFields = async () => {
    const f = await apiRequest(`/field?form_id=eq.${id}`);
    setFields(f);
  }
  const initializeRecordValues = () => {
    setRecordValues(fields.map(f=>{return{
      idx:f.order_index,
      value:''
    }}))
  }
  const updateFlatList = () => {
    setFlatListData(fields.map(
      (f)=>{ return {
        ...f,
        recordData:recordValues[f.order_index],
        updateRecord:updateValue(f.order_index)
      }}
    ))
  }

  // get our field data 
  useEffect(()=>{ 
    if (id) {
      fetchFields();
      if (recordValues === undefined || recordValues.length === 0) {
        console.log('initializing');
        initializeRecordValues();
      }
      updateFlatList();
    }
    console.log('fields:');
    console.log(fields);
  
    console.log('recordValues:');
    console.log(recordValues);
    console.log('flatlistData');
    console.log(flatListData);


  },[currState,id]);