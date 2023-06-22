import styles from "./style.module.css";
import {Button, Card, Form, Input, message} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {login} from "../store/authenticationReducer";

const Authorization = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector((state) => state.authentication.errors);
    const [messageApi, contextHolder] = message.useMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const warning = (error) => {
        messageApi.open({
            type: 'warning',
            content: error,
        });
    };

    const onFinish = (values) => {
        console.log(values);
        dispatch(login(values.email, values.password)).then(() => {
            navigate('/blogs', {replace: true});
        }).catch(() => {
           console.log('Login failed');
        });
    };

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            console.log("Errors:", errors);
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    warning(errors[key]);
                    console.log(errors[key]);
                }
            }
        }
    }, [dispatch, warning, errors]);

    return(
        <div className={styles.cardDeck}>
            {contextHolder}
            <Card className={styles.authCard}>
                <div className={styles.title}>Авторизация</div>
                <div className={styles.authFormContainer}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <Input prefix={<MailOutlined style={{ fontSize: '20px'}} />}
                                   placeholder="Email"
                                   style={{ height: "40px" }}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                type="password"
                                placeholder="Password"
                                style={{ height: "40px" }}/>
                        </Form.Item>
                        <Form.Item
                            className={styles.regFormItem}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                style={{backgroundColor: "#6D8251",
                                    height: "50px",
                                    fontSize: "20px"}}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
}

export default Authorization;