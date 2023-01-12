import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import client from '../api/client'

import Icon from 'react-native-vector-icons/AntDesign'
import { displayPrice, isValidObjectField, truncateString, updateError } from '../utils/methods'
import FormContainer from '../components/FormContainer'
import FormInput from '../components/FormInput'
import FormSubmitButton from '../components/FormSubmitButton'

export default function BookList() {

  const [booklist, setBooks] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [bookId, setBookId] = useState('')
  const [Id, setId] = useState(null)

  const onChangeTitle = (value) => {
    setTitle(value)
  }

  const onChangeDescription = (value) => {
    setDescription(value)
  }

  const onChangeAuthor = (value) => {
    setAuthor(value)
  }

  const onChangePublisher = (value) => {
    setPublisher(value)
  }

  const onChangePrice = (value) => {
    setPrice(value)
  }

  const onChangeQuantity = (value) => {
    setQuantity(value)
  }

  const onChangeBookId = (value) => {
    setBookId(value)
  }
  
  const getBooks = async () => {

    console.log(route.params.login.token)

    // call backend to get the books for authorized user
    const res = await client.post('/', {
      query: `
          query {
            books {
              title
              author
              description
              publisher
              bookId
              price
              quantity
              _id
            }
          }
        `
    },{
      headers: { "Content-Type": "application/json" , "Authorization": "Bearer " + route.params.login.token }
    })

    setBooks(res.data.data.books) // bit of a mouthful but there you go

  }

  const showBookDetails = (item) => {
    setTitle(item.title)
    setDescription(item.description)
    setAuthor(item.author)
    setPublisher(item.publisher)
    setPrice(item.price.toString())
    setQuantity(item.quantity.toString())
    setBookId(item.bookId)
    setDetailsVisible(true)
  }

  const resetValues = () => {
    setTitle('')
    setDescription('')
    setAuthor('')
    setPublisher('')
    setPrice(0)
    setQuantity(0)
    setBookId('')
    setId(null)
  }

  const editBook = (item) => {
    setTitle(item.title)
    setDescription(item.description)
    setAuthor(item.author)
    setPublisher(item.publisher)
    setPrice(item.price.toString())
    setQuantity(item.quantity.toString())
    setBookId(item.bookId)
    setId(item._id)
    setModalVisible(true)
  }

  const updateBook = async (id) => {

    // call backend to update a book for authorized user
    const res = await client.post('/', {
      query: `
          mutation {
            updateBook(bookUpdate: {
                id: "${id}",
                title: "${title}"
                description: "${description}",
                author: "${author}",
                publisher: "${publisher}",
                price: ${price},
                quantity: ${quantity},
                bookId: "${bookId.toString()}",
            }) { 
                title,
                _id
            }
          } 
        `
    },{
      headers: { "Content-Type": "application/json" , "Authorization": "Bearer " + route.params.login.token }
    })

    resetValues()
    setRefresh(!refresh) // refresh page after deletion...
    setModalVisible(false)
  }

  const addBook = () => {

    setId(null)

    // show add book modal
    setModalVisible(true)

  }

  const addNewBook = async () => {

    // call backend to add a new book for authorized user
    const res = await client.post('/', {
      query: `
          mutation {
            createBook(bookInput: {
                title: "${title}"
                description: "${description}",
                author: "${author}",
                publisher: "${publisher}",
                price: ${price},
                quantity: ${quantity},
                userId: "${route.params.login.userId}",
                bookId: "${bookId.toString()}",
            }) { 
                title,
                _id
            }
          } 
        `
    },{
      headers: { "Content-Type": "application/json" , "Authorization": "Bearer " + route.params.login.token }
    })

    resetValues()
    setRefresh(!refresh) // refresh page after deletion...
    setModalVisible(false)
  }

  const confirmDelete = (id) => {

    Alert.alert("Delete", "Are You Sure?", [
      {text: 'Yes', onPress: ()=>handleDeletion(id)},
      {text: 'No'}
    ])

  }

  const handleDeletion = async (id) => {

    // call backend to delete the selected book
    const res = await client.post('/', {
      query: `
        mutation {
          deleteBook(id: "${id}")
        } 
      `
    },{
      headers: { "Content-Type": "application/json" , "Authorization": "Bearer " + route.params.login.token }
    })
    setRefresh(!refresh) // refresh page after deletion...
  }

  const route = useRoute()

  useEffect(() => {

    // get the books
    getBooks()                          

  }, [refresh])

 

  const isValidForm = () => {

    // all fields must have a value
    if(!isValidObjectField(bookInfo)) 
      return updateError('All fields required!', setError)
    
    console.log(bookInfo)

    return true
``
  }

  const book = ({item}) => (

    <TouchableOpacity  onPress={()=>showBookDetails(item)}>

      <View style={{flexDirection: 'row', backgroundColor: 'lightgreen', marginBottom:5}}>
        <Image
          source={{uri: 'http://192.168.0.220:3000/images/cover(' + item.bookId + ').jpg'}}
          style={{height: 80, width: 60, margin: 5, marginRight:10}}
        />
        <View style={{justifyContent: 'center', width: '62%'}}>
          <Text style={styles.title}>{truncateString(item.title,30) }</Text>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.author}>{displayPrice(item.price)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="edit" size={30} style={{marginRight:5}} onPress={()=>editBook(item)}/>
          <Icon name="delete" size={30} color="#900" onPress={()=>confirmDelete(item._id)} />
        </View>
      </View>

    </TouchableOpacity>

  )

  return (
      <View style={{ flex: 1 , paddingTop: 10}}> 
        <FlatList
          data={booklist}
          renderItem={book}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={addBook}
        >
          <Text style={{fontWeight: 'bold'}}>ADD NEW BOOK</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            resetValues()
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{Id == null ? "ADD NEW BOOK" : "UPDATE BOOK"}</Text>
            <ScrollView style={styles.scrollView}>
              <FormContainer>
                {error ? (
                  <Text style={{ color: 'red', fontSize:18, textAlign: 'center'}}>
                    {error}
                  </Text>
                ) : null}
                <FormInput 
                  value={title} 
                  label='Title'
                  autoCapitalize='none' 
                  onChangeText={(value) => onChangeTitle(value)}
                />
                <FormInput 
                  value={description} 
                  label='Description' 
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={(value) => onChangeDescription(value)}
                />
                <FormInput 
                  value={author} 
                  label='Author' 
                  onChangeText={(value) => onChangeAuthor(value)}
                />
                <FormInput 
                  value={publisher} 
                  label='Publisher' 
                  onChangeText={(value) => onChangePublisher(value)}
                />
                <FormInput 
                  value={price} 
                  label='Price'
                  keyboard='numeric'
                  onChangeText={(value) => onChangePrice(value)}
                />
                <FormInput 
                  value={quantity} 
                  label='Quantity'
                  keyboard='numeric'
                  onChangeText={(value) => onChangeQuantity(value)}
                />
                <FormInput 
                  value={bookId} 
                  label='Book Id'
                  keyboard='numeric'
                  onChangeText={(value) => onChangeBookId(value)}
                />
                <FormSubmitButton onPress={()=> {Id == null ? addNewBook() : updateBook(Id)}} label={Id == null ? "Add Book" : "Update Book"} marginT={40}/>
              </FormContainer>
            </ScrollView>

          </View>

        </Modal>

        <Modal
          animationType="slide"
          visible={detailsVisible}
          onRequestClose={() => {
            resetValues()
            setDetailsVisible(!detailsVisible)
          }}
        >
          <View style={styles.detailsView}>
            <ScrollView>
              <Text style={styles.headerText}>{title}</Text>
              
              <Image
                source={{uri: 'http://192.168.0.220:3000/images/cover(' + bookId + ').jpg'}}
                style={{height: 300, width: 200, marginVertical: 10, alignSelf: 'center'}}
              />

              <Text style={{alignSelf: 'center', fontWeight:'bold', marginHorizontal: 15, marginBottom: 20}}>{description}</Text>

              <View style={styles.viewContainer}>
                <Text style={{fontWeight:'bold',fontSize: 16, marginLeft: 15}}>Author: </Text>
                <Text style={{fontWeight:'bold',fontSize: 16}}>{author}</Text>
              </View>

              <View style={styles.viewContainer}>
                <Text style={{fontWeight:'bold',fontSize: 16, marginLeft: 15}}>Publisher: </Text>
                <Text style={{fontWeight:'bold',fontSize: 16}}>{publisher}</Text>
              </View>

              <View style={styles.viewContainer}>
                <Text style={{fontWeight:'bold',fontSize: 16, marginLeft: 15}}>Price: </Text>
                <Text style={{fontWeight:'bold',fontSize: 16}}>{'£' + price}</Text>
              </View>

              <View style={styles.viewContainer}>
                <Text style={{fontWeight:'bold',fontSize: 16, marginLeft: 15}}>Quantity: </Text>
                <Text style={{fontWeight:'bold',fontSize: 16}}>{quantity}</Text>
              </View>

              <FormSubmitButton onPress={()=> {setDetailsVisible(false); resetValues()}} label="Back To List" marginT={20}/>
            </ScrollView>
          </View>

        </Modal>
      </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  author: {
    fontSize: 14
  },
  button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    marginTop: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",

  },
  detailsView: {
    backgroundColor: '#afede7',
    alignItems: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold'
  },
  headerText: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold'
  },
  scrollView: {
    marginLeft: -60, 
    marginRight: -60,
    padding: 0,
    color: 'black'
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold'
  },
})
