import { Button } from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"

export default function chnagePassword() {

    return (
        <div className="p-5">
            <Card>
                <form action="" className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="current">Current Password</Label>
                        <Input type="text" id="current" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="new">New Password</Label>
                        <Input type="text" id="new" />
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </Card>
        </div>
    )
}