package msg

type Error int

const (
	Unknown Error = iota
	UserNotexist
	PasswdError
)

func (e Error) String() string {
	switch e {
	case UserNotexist:
		return "User does not exist!"
	case PasswdError:
		return "Password error!"
	default:
		return "Unknown"
	}
}
