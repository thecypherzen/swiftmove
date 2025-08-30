import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { toast } from "sonner";
import { ScheduleDeliveryMutationFn } from "@/lib/RequestLibrary";
import { NewDeliveryFormSchema, type NewDeliveryFormType } from "./schemas";
import UseModal from "@/hooks/UseModal";
import { Textarea } from "../ui/textarea";

const CreateDeliveryForm = () => {
  const form = useForm<NewDeliveryFormType>({
    resolver: zodResolver(NewDeliveryFormSchema),
    defaultValues: {
      shipmentId: "",
      driverId: "",
      departure: "",
      estArrival: "scheduled",
    },
  });

  const scheduleDeliveryMutation = useMutation({
    mutationFn: ScheduleDeliveryMutationFn,
  });
  const onSubmit = (data: Record<string, any>) => {
    const deliveryDate = data.deliveryDate ? new Date(data.deliveryDate) : null;
    scheduleDeliveryMutation.mutate({
      ...data,
      deliveryDate,
    });
  };
  const { setOpenDeliveryModal } = UseModal();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="shipmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Shipment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a shipment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"shipment 1"}>"Shipment 1"</SelectItem>
                  <SelectItem value={"shipment 2"}>"Shipment 2"</SelectItem>
                  <SelectItem value={"shipment 3"}>"Shipment 3"</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Driver</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a driver" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"driver-1"}>"Driver 1"</SelectItem>
                  <SelectItem value={"driver-2"}>"Driver 2"</SelectItem>
                  <SelectItem value={"driver-3"}>"Driver 3"</SelectItem>
                  <SelectItem value={"driver-4"}>"Driver 4"</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="departure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().slice(0, 16)
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estArrival"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Arrival</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} value={""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions or notes..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setTimeout(() => setOpenDeliveryModal(false), 100);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={scheduleDeliveryMutation.isPending}>
            {scheduleDeliveryMutation.isPending
              ? "Scheduling..."
              : "Schedule Delivery"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateDeliveryForm;
