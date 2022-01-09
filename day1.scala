import scala.io.*
import scala.collection.mutable.HashSet

def read = Source.fromFile("1.in").getLines.toList

class CircularBuffer[A](list: List[A]):
  private var index: Int = 0
  private val len: Int = list.length
  def next: A =
    val curr = this.list(index)
    index = index + 1
    if index == len then index = 0
    return curr
    


def part1(lines: List[Int]): Unit =
  val ans = lines.reduceLeft(_+_)
  println(s"part1: $ans")

def part2(lines: List[Int]): Unit =
  val visited: HashSet[Int] = HashSet()
  val buff = CircularBuffer(lines)
  var sum = 0
  while true do 
    sum = sum + buff.next
    if visited.contains(sum) then
      println(s"part2: $sum")
      return
    visited.add(sum)

  
  

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

@main def solve = 
  val lines = read.map(_.toInt)
  timeup(part1, lines)
  timeup(part2, lines)
