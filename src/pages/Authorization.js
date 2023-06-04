import styles from "./style.module.css";
import {Button, Card, DatePicker, Form, Input, message} from "antd";
import {EnvironmentOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Authorization = () => {
    const dateFormat = 'YYYY-MM-DD';
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    };

    useEffect(() => {
    }, [dispatch, warning]);

    return(
        <div className={styles.cardDeck}>
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
                            name="password1"
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