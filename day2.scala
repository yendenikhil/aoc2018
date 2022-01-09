import scala.io.*

def read = Source.fromFile("2.in").getLines.toList

def timeup[A](f: (List[A]) => Unit, lines: List[A]): Unit = 
  val start = System.nanoTime()
  f(lines)
  val end = System.nanoTime()
  val diff = end - start
  val s = diff / 1_000_000_000
  val ms = diff / 1_000_000 - 1000 * s
  val mus = diff / 1000 - 1000 * ms - 1000_000 * s
  val ns = diff % 1_000
  println(s"time: $s s $ms ms $mus μs $ns ns")

def part1(lines: List[String]) = 
  val counts = lines.map(line => line
                      .groupMapReduce(e => e)(e => 1)(_+_)
                      .map((k, v) => v)
                      .filter(v => v == 2 || v == 3)
                      .toList
                      )
  val counter = (list: List[List[Int]]) => 
                (n: Int) => 
                        list.filter(_.contains(n)).length
  val ans = counter(counts)(2) * counter(counts)(3)
  println(ans)

def part2 (lines: List[String]): Unit = 
  for l1 <- lines do
    for l2 <- lines do
      if l1 != l2 then
        if l1.diff(l2).length == 1 then
          val ans = l1.zip(l2)
              .filter((a, b) => a == b)
              .map((a, b) => a)
              .mkString("")
          println(ans)
          return

@main def solve = 
  val lines = read
  timeup(part1, lines)
  timeup(part2, lines)


