"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useList from "@/hooks/useList";
import { URLS } from "@/constants";
import { useEffect } from "react";
import TaskStore from "@/store/TaskStore";

export default function Blog() {

    const { tasks, setTask } = TaskStore((state) => state);

    const { isLoading, isError, data } = useList('listTask',`${URLS.TASK}/list`, 1, 5)

    useEffect(() => {
        if (data) {
            setTask(data.data);
        }
    }, [data, setTask]);

    if (isLoading) {
        return (
            <div className="box m-4 flex">
                <div className="flex flex-wrap">
                    {[...Array(4)].map((_, index) => (
                        <Card className="p-3 m-1" key={index}>
                            <CardHeader>
                                <CardTitle className="pl-2">
                                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                </CardTitle>
                                <CardDescription>
                                    <Skeleton className="w-[110px] h-[20px] rounded-full" />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="w-[250px] h-[200px] " />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }


    if (isError) {
        return <div>Error: Failed to load task. Please try again later.</div>;
    }

    if (tasks) {
        return (
            <div className="box m-4 flex">
                <div className="flex flex-wrap">
                    {tasks.map((taskItem) => (
                        <Card className="p-3 m-1" key={taskItem.id}>
                            <CardHeader>

                                <CardTitle className="pl-2">{taskItem.title}</CardTitle>
                                <CardDescription>{taskItem.description}</CardDescription>
                            </CardHeader>
                            <img className="w-80  h-[200px] " src={'https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg='}></img>
                            {/* <img src={blogItem.images ? blogItem.images : ''} alt={blogItem.title}></img> */}             <CardContent>

                                {/* <img className="w-80" src={blogItem.images} alt={blogItem.title} /> */}
                            </CardContent>
                            <CardFooter>
                                <h2>By: {taskItem.userId}</h2>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return null; // Render nothing if no blogs are available yet
}

