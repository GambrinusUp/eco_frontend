import styles from './style.module.css'
import {Button, Card, DatePicker, Form, Input, message} from "antd";
import {EnvironmentOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const Registration = () => {
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
        console.log(values.birth_date.format(dateFormat));
        console.log(values);
    };

    useEffect(() => {
    }, [dispatch, warning]);

    return(
        <div className={styles.cardDeck}>
            <Card className={styles.regCard}>
                <div className={styles.title}>Регистрация</div>
                <div className={styles.authFormContainer}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}>
                        <Form.Item
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first_name!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <Input
                                   placeholder="First_name"
                                   style={{ height: "40px" }}/>
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last_name!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <Input
                                   placeholder="Last_name"
                                   style={{ height: "40px" }}/>
                        </Form.Item>
                        <Form.Item
                            name="birth_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your birthdate!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <DatePicker
                                prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '20px'}} />}
                                type="date"
                                format={dateFormat}
                                placeholder="Birth_date"
                                style={{ height: "40px", width: "600px"}}/>
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone_number!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <PhoneInput
                                inputClass="ant-input css-dev-only-do-not-override-k7429z"
                                specialLabel=""
                                country={'rus'}
                                onChange={phone => console.log(phone)}
                                inputStyle={{height:"40px"}}
                            />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your City!',
                                },
                            ]}
                            className={styles.regFormItem}>
                            <Input
                                prefix={<EnvironmentOutlined style={{ fontSize: '20px'}}/>}
                                placeholder="City"
                                style={{ height: "40px" }}/>
                        </Form.Item>
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
                            name="password2"
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
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
}

export default Registration;
