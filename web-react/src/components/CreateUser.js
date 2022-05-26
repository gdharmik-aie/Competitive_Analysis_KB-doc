import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import {
    Paper,
    TextField,
    Button,
    Typography,
} from '@material-ui/core'
import Title from './Title'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
    root: {
        maxWidth: 700,
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        margin: 'auto',
    },
    textField: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
    submitButton: {
        margin: theme.spacing(2)
    },
    navLink: {
        textDecoration: 'none',
        color: 'inherit',
    }
})

const CREATE_USER = gql`
 mutation userCreateMutationQuery($input: [UserCreateInput!]!){
 createUsers(input: $input) {
    users {
      userId
      name
    }
  }
 }
 
 
`
function CreateUser(props) {
    const { classes } = props
    const [userId, setUserId] = React.useState("")
    const [userName, setUserName] = React.useState("")


    const [createUsers, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_USER,
        { variables: { input: { userId: userId, name: userName } } })


    const onUserIdChange = (e) => {
        const userId = e.target.value
        setUserId(userId)
    }

    const onUserNameChange = (e) => {
        const userName = e.target.value
        setUserName(userName)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        createUsers()
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setUserId("")
            setUserName("")
           
        }
    }



    return (
        <Paper className={classes.root}>
            <div className='title-container'>
                <Title>
                    Create User
                </Title>
                <Link to="/users" className={classes.navLink}> <Button color="primary" variant="outlined" >
                    User List
                </Button></Link>
            </div>

            <form onSubmit={handlerSubmit}>
                <Typography>
                    <TextField className={classes.textField} required label="User Id" onChange={onUserIdChange} value={userId}>
                    </TextField>
                </Typography>
                <Typography>
                    <TextField className={classes.textField} required label="User Name" onChange={onUserNameChange} value={userName}>
                    </TextField>
                </Typography>

                <Button className={classes.submitButton} type='submit'>
                    Create user
                </Button>
            </form>
        </Paper>
    )
}

export default withStyles(styles)(CreateUser)